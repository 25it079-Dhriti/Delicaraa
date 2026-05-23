import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

const dbPath = path.join(process.cwd(), "lib", "reviews-db.json")

// Helper to read reviews safely
function readReviews(): any[] {
  try {
    if (!fs.existsSync(dbPath)) {
      return []
    }
    const data = fs.readFileSync(dbPath, "utf-8")
    return JSON.parse(data)
  } catch (err) {
    console.error("Read reviews error:", err)
    return []
  }
}

// Helper to write reviews safely
function writeReviews(reviews: any[]) {
  try {
    fs.writeFileSync(dbPath, JSON.stringify(reviews, null, 2), "utf-8")
  } catch (err) {
    console.error("Write reviews error:", err)
  }
}

export async function GET() {
  const reviews = readReviews()
  return NextResponse.json({ success: true, reviews })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, rating, comment, design, image } = body

    if (!name || !rating || !comment || !design) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    const reviews = readReviews()

    const newReview = {
      id: `rev-${Date.now()}`,
      name: name.trim(),
      rating: Number(rating),
      comment: comment.trim(),
      design: design.trim(),
      image, // base64 or undefined
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    }

    // Insert new review at the beginning
    const updated = [newReview, ...reviews]
    writeReviews(updated)

    // Send email notification to Dhriti via Web3Forms
    const web3formsPayload = {
      access_key: "67c30f3a-6b75-4daf-a02f-bb31fa8b229b",
      subject: `🌸 New Customer Review Posted by ${newReview.name} - ${newReview.rating} Stars`,
      name: newReview.name,
      rating: `${newReview.rating}/5 Stars`,
      design: newReview.design,
      review_comment: newReview.comment,
      image_attached: image ? "Yes (Check website)" : "No"
    }

    let emailSent = false
    let smtpWarning = ""

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(web3formsPayload),
      })
      const data = await res.json()
      if (data.success) {
        emailSent = true
      } else {
        smtpWarning = data.message || "Web3Forms submission failed"
      }
    } catch (err: any) {
      smtpWarning = "Web3Forms fetch error: " + err.message
      console.warn("Web3Forms Email Warning:", smtpWarning)
    }

    return NextResponse.json({
      success: true,
      emailSent,
      warning: smtpWarning,
      review: newReview,
    })
  } catch (error: any) {
    console.error("Reviews API Error:", error)
    return NextResponse.json(
      { success: false, error: error.message || "Failed to submit review" },
      { status: 500 }
    )
  }
}
