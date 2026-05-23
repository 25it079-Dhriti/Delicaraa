import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      cart,
      addressData,
      sizingData,
      couponApplied,
      discountAmount,
      deliveryCharges,
      subtotal,
      finalTotal,
      paymentMethod,
      customerEmail,
    } = body

    // 1. Build beautiful HTML email bodies
    const itemsTableHtml = cart
      .map(
        (item: any) => `
      <tr style="border-bottom: 1px solid #f1f5f9;">
        <td style="padding: 12px; text-align: left; font-size: 14px; color: #334155;">
          <strong>${item.name}</strong><br>
          <span style="font-size: 11px; color: #64748b;">Category: ${item.category}</span>
        </td>
        <td style="padding: 12px; text-align: center; font-size: 14px; color: #334155;">${item.quantity}</td>
        <td style="padding: 12px; text-align: right; font-size: 14px; color: #334155; font-weight: 600;">₹${item.price * item.quantity}</td>
      </tr>
    `
      )
      .join("")

    const detailsHtml = `
      <div style="background-color: #fcf8f8; border: 1px solid #fce7e7; border-radius: 12px; padding: 20px; margin-bottom: 24px; font-family: sans-serif;">
        <h3 style="margin-top: 0; color: #db2777; font-size: 16px; border-bottom: 1px solid #fbcfe8; padding-bottom: 8px;">👤 Customer & Sizing Details</h3>
        <p style="margin: 6px 0; font-size: 14px; color: #475569;"><strong>Name:</strong> ${addressData.name}</p>
        <p style="margin: 6px 0; font-size: 14px; color: #475569;"><strong>WhatsApp Contact:</strong> ${addressData.phone}</p>
        <p style="margin: 6px 0; font-size: 14px; color: #475569;"><strong>Customer Email:</strong> ${customerEmail || "Guest Order"}</p>
        
        <h4 style="margin: 16px 0 6px 0; color: #db2777; font-size: 14px;">📏 Press-on Nail Sizing</h4>
        <p style="margin: 4px 0; font-size: 13px; color: #475569;"><strong>Shape:</strong> ${sizingData?.shape || "Not specified"}</p>
        <p style="margin: 4px 0; font-size: 13px; color: #475569;"><strong>Standard Size:</strong> ${sizingData?.standardSize || "Not specified"}</p>
        ${
          sizingData?.standardSize === "Custom"
            ? `
          <p style="margin: 4px 0; font-size: 12px; color: #64748b; font-style: italic;">
            Left hand: Th: ${sizingData.leftThumb}mm, In: ${sizingData.leftIndex}mm, Mi: ${sizingData.leftMiddle}mm, Ri: ${sizingData.leftRing}mm, Pi: ${sizingData.leftPinky}mm<br>
            Right hand: Th: ${sizingData.rightThumb}mm, In: ${sizingData.rightIndex}mm, Mi: ${sizingData.rightMiddle}mm, Ri: ${sizingData.rightRing}mm, Pi: ${sizingData.rightPinky}mm
          </p>
        `
            : ""
        }
      </div>

      <div style="background-color: #fcf8f8; border: 1px solid #fce7e7; border-radius: 12px; padding: 20px; margin-bottom: 24px; font-family: sans-serif;">
        <h3 style="margin-top: 0; color: #db2777; font-size: 16px; border-bottom: 1px solid #fbcfe8; padding-bottom: 8px;">📍 Shipping Address</h3>
        <p style="margin: 6px 0; font-size: 14px; color: #475569;">${addressData.address}</p>
        <p style="margin: 6px 0; font-size: 14px; color: #475569;">${addressData.city}, ${addressData.state} - ${addressData.pincode}</p>
      </div>

      <div style="background-color: #fcf8f8; border: 1px solid #fce7e7; border-radius: 12px; padding: 20px; font-family: sans-serif;">
        <h3 style="margin-top: 0; color: #db2777; font-size: 16px; border-bottom: 1px solid #fbcfe8; padding-bottom: 8px;">💳 Payment Information</h3>
        <p style="margin: 6px 0; font-size: 14px; color: #475569;"><strong>Selected Method:</strong> ${paymentMethod}</p>
        ${
          paymentMethod === "UPI"
            ? `<p style="margin: 4px 0; font-size: 12px; color: #64748b;">(Instructions: Pay to UPI ID <strong>delicaraa@upi</strong> and send proof on WhatsApp)</p>`
            : ""
        }
      </div>
    `

    const htmlEmailLayout = (title: string, intro: string) => `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>${title}</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #fdf2f8; font-family: 'Georgia', serif;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-w: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 24px; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(219, 39, 119, 0.1);">
          <!-- Header Banner -->
          <tr>
            <td style="background: linear-gradient(135deg, #fbcfe8 0%, #f472b6 100%); padding: 32px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: normal; letter-spacing: 1px;">💖 Delicaraa</h1>
              <p style="margin: 4px 0 0 0; color: #fdf2f8; font-size: 12px; font-family: sans-serif; text-transform: uppercase; letter-spacing: 2px;">by dhriti</p>
            </td>
          </tr>
          
          <!-- Content Body -->
          <tr>
            <td style="padding: 40px 32px;">
              <h2 style="margin-top: 0; color: #1e293b; font-size: 22px; font-weight: 600; text-align: center;">${title}</h2>
              <p style="font-family: sans-serif; font-size: 14px; line-height: 1.6; color: #475569; margin-bottom: 32px; text-align: center;">
                ${intro}
              </p>
              
              <!-- Itemized Invoice Table -->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse; margin-bottom: 32px; font-family: sans-serif;">
                <thead>
                  <tr style="background-color: #fdf2f8; border-bottom: 2px solid #fbcfe8;">
                    <th style="padding: 12px; text-align: left; font-size: 12px; text-transform: uppercase; color: #db2777; font-weight: 600;">Nail Set Style</th>
                    <th style="padding: 12px; text-align: center; font-size: 12px; text-transform: uppercase; color: #db2777; font-weight: 600;">Qty</th>
                    <th style="padding: 12px; text-align: right; font-size: 12px; text-transform: uppercase; color: #db2777; font-weight: 600;">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsTableHtml}
                  
                  <!-- Financial details -->
                  <tr>
                    <td colspan="2" style="padding: 12px 12px 6px 12px; text-align: right; font-size: 13px; color: #64748b;">Cart Subtotal:</td>
                    <td style="padding: 12px 12px 6px 12px; text-align: right; font-size: 13px; color: #475569; font-weight: 600;">₹${subtotal}</td>
                  </tr>
                  ${
                    couponApplied
                      ? `
                  <tr>
                    <td colspan="2" style="padding: 6px 12px; text-align: right; font-size: 13px; color: #db2777; font-weight: 600;">DELI011 Discount (10% OFF):</td>
                    <td style="padding: 6px 12px; text-align: right; font-size: 13px; color: #db2777; font-weight: 600;">-₹${discountAmount}</td>
                  </tr>
                  `
                      : ""
                  }
                  <tr>
                    <td colspan="2" style="padding: 6px 12px; text-align: right; font-size: 13px; color: #64748b;">Delivery Shipping Fee:</td>
                    <td style="padding: 6px 12px; text-align: right; font-size: 13px; color: #475569; font-weight: 600;">₹${deliveryCharges}</td>
                  </tr>
                  <tr style="border-top: 2px dashed #fbcfe8;">
                    <td colspan="2" style="padding: 16px 12px; text-align: right; font-size: 16px; font-weight: bold; color: #1e293b;">Total Bill Payable:</td>
                    <td style="padding: 16px 12px; text-align: right; font-size: 18px; font-weight: bold; color: #db2777;">₹${finalTotal}</td>
                  </tr>
                </tbody>
              </table>

              <!-- Detailed parameters -->
              ${detailsHtml}

              <p style="font-family: sans-serif; font-size: 12px; color: #94a3b8; text-align: center; margin-top: 40px; line-height: 1.5;">
                🌸 Delicaraa hand-crafts custom sizing tools and prep kits for free on every order.<br>
                If you have custom queries, feel free to reply directly to this email or message on WhatsApp.
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f8fafc; padding: 24px; text-align: center; font-family: sans-serif; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0;">
              Thank you for choosing Delicaraa! Hand-painted with love by Dhriti. 💅✨
            </td>
          </tr>
        </table>
      </body>
      </html>
    `

    // 2. Transporter configuration (loads credentials securely)
    // We supply a fallback configuration (with warning logs) so it compiles cleanly
    const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com"
    const smtpPort = parseInt(process.env.SMTP_PORT || "465", 10)
    const smtpUser = process.env.SMTP_USER
    const smtpPass = process.env.SMTP_PASSWORD

    let emailSentSuccessfully = false
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

      // Send to business email
      await transporter.sendMail({
        from: `"Delicaraa Orders" <${smtpUser}>`,
        to: "delicaraa.work@gmail.com",
        subject: `🌸 New Order Placed by ${addressData.name} - ₹${finalTotal}`,
        html: htmlEmailLayout(
          "New Website Order Received!",
          `A new order has been submitted on the website. Here are the invoice and shipment details to prepare:`
        ),
      })

      // Send to customer email if provided
      if (customerEmail && customerEmail.trim() !== "") {
        await transporter.sendMail({
          from: `"Delicaraa by Dhriti" <${smtpUser}>`,
          to: customerEmail,
          subject: `✨ Your Delicaraa Order Invoice - ₹${finalTotal}`,
          html: htmlEmailLayout(
            "Thank You for Your Order!",
            `We are excited to paint your gorgeous sets! Here is your itemized bill receipt. Sizing kits and measurements will be coordinated via WhatsApp.`
          ),
        })
      }
      emailSentSuccessfully = true
    } else {
      smtpWarning = "SMTP credentials (SMTP_USER, SMTP_PASSWORD) not found in process environment variables. Order compiled but email notification skipped."
      console.warn("Nodemailer Email Warning:", smtpWarning)
      console.log("Mock Order Email notification would send to: delicaraa.work@gmail.com")
      if (customerEmail) {
        console.log(`Mock Invoice Email would send to: ${customerEmail}`)
      }
    }

    return NextResponse.json({
      success: true,
      emailSent: emailSentSuccessfully,
      warning: smtpWarning,
      orderDetails: {
        customerName: addressData.name,
        finalTotal,
        paymentMethod,
      },
    })
  } catch (error: any) {
    console.error("Order API Error:", error)
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to process order notification email",
      },
      { status: 500 }
    )
  }
}
