import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import nodemailer from "nodemailer"

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

    // Send email notification to Dhriti
    const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com"
    const smtpPort = parseInt(process.env.SMTP_PORT || "465", 10)
    const smtpUser = process.env.SMTP_USER
    const smtpPass = process.env.SMTP_PASSWORD

    let emailSent = false
    let smtpWarning = ""

    if (smtpUser && smtpPass) {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      })

      const starString = "★".repeat(newReview.rating) + "☆".repeat(5 - newReview.rating)

      const emailHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>New Customer Review</title>
        </head>
        <body style="margin: 0; padding: 0; background-color: #fdf2f8; font-family: sans-serif;">
          <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-w: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 24px; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(219, 39, 119, 0.1); border: 1px solid #fbcfe8;">
            <!-- Header -->
            <tr>
              <td style="background: linear-gradient(135deg, #fbcfe8 0%, #f472b6 100%); padding: 24px; text-align: center;">
                <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: normal; font-family: 'Georgia', serif;">💖 Delicaraa</h1>
                <p style="margin: 4px 0 0 0; color: #fdf2f8; font-size: 11px; text-transform: uppercase; letter-spacing: 2px;">Review Notification</p>
              </td>
            </tr>
            
            <!-- Content -->
            <tr>
              <td style="padding: 32px;">
                <h2 style="margin-top: 0; color: #db2777; font-size: 20px; font-weight: 600; text-align: center;">🌸 New Customer Review Posted!</h2>
                <p style="font-size: 14px; color: #475569; margin-bottom: 24px; text-align: center; line-height: 1.5;">
                  A sweet girl just shared her experience on the website. Here are the details:
                </p>

                <!-- Details card -->
                <div style="background-color: #fcf8f8; border: 1px solid #fce7e7; border-radius: 16px; padding: 20px; margin-bottom: 24px;">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                      <td style="padding: 6px 0; font-size: 14px; color: #64748b; font-weight: bold; width: 120px;">Customer Name:</td>
                      <td style="padding: 6px 0; font-size: 14px; color: #1e293b;">${newReview.name}</td>
                    </tr>
                    <tr>
                      <td style="padding: 6px 0; font-size: 14px; color: #64748b; font-weight: bold;">Nail Design:</td>
                      <td style="padding: 6px 0; font-size: 14px; color: #db2777; font-weight: 600;">${newReview.design}</td>
                    </tr>
                    <tr>
                      <td style="padding: 6px 0; font-size: 14px; color: #64748b; font-weight: bold;">Rating:</td>
                      <td style="padding: 6px 0; font-size: 16px; color: #eab308;">${starString} (${newReview.rating}/5)</td>
                    </tr>
                    <tr>
                      <td style="padding: 6px 0; font-size: 14px; color: #64748b; font-weight: bold; vertical-align: top;">Review:</td>
                      <td style="padding: 6px 0; font-size: 14px; color: #334155; font-style: italic; line-height: 1.6;">
                        "${newReview.comment}"
                      </td>
                    </tr>
                  </table>
                </div>

                <!-- Review Photo if uploaded -->
                ${
                  image
                    ? `
                  <div style="text-align: center; margin-bottom: 24px;">
                    <p style="font-size: 12px; color: #64748b; font-weight: bold; margin-bottom: 8px;">💅 Hand-painted Set Photo:</p>
                    <img src="${image}" alt="Customer Nails" style="max-width: 100%; max-height: 350px; border-radius: 16px; border: 1px solid #fbcfe8; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);" />
                  </div>
                `
                    : `
                  <div style="text-align: center; font-size: 12px; color: #94a3b8; font-style: italic; margin-bottom: 24px;">
                    (No photo was uploaded with this review)
                  </div>
                `
                }
                
                <div style="text-align: center; margin-top: 32px;">
                  <a href="https://instagram.com/delicaraa" target="_blank" style="background-color: #db2777; color: #ffffff; padding: 12px 24px; text-decoration: none; font-size: 14px; font-weight: 600; border-radius: 50px; box-shadow: 0 4px 6px -1px rgba(219, 39, 119, 0.2);">
                    Visit Instagram @delicaraa
                  </a>
                </div>
              </td>
            </tr>
            
            <!-- Footer -->
            <tr>
              <td style="background-color: #f8fafc; padding: 16px; text-align: center; font-size: 11px; color: #94a3b8; border-top: 1px solid #e2e8f0;">
                Delicaraa by Dhriti. Handcrafted with love. 💅✨
              </td>
            </tr>
          </table>
        </body>
        </html>
      `

      await transporter.sendMail({
        from: `"Delicaraa Reviews" <${smtpUser}>`,
        to: "delicaraa.work@gmail.com",
        subject: `🌸 New Customer Review Posted by ${newReview.name} - ${newReview.rating} Stars`,
        html: emailHtml,
      })
      emailSent = true
    } else {
      smtpWarning = "SMTP credentials not found in env. Email skipped."
      console.warn("Nodemailer Email Warning:", smtpWarning)
      console.log(`Mock Review Email notification would send to delicaraa.work@gmail.com: ${name} (${rating} stars)`)
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
