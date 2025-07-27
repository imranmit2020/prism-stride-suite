import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface PasswordResetRequest {
  email: string;
  resetUrl: string;
  token: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, resetUrl, token }: PasswordResetRequest = await req.json();

    const emailResponse = await resend.emails.send({
      from: "BizStack <noreply@yourdomain.com>",
      to: [email],
      subject: "Reset Your BizStack Password",
      html: `
        <div style="max-width: 600px; margin: 0 auto; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333;">
          <div style="background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); padding: 40px 30px; text-align: center; border-radius: 12px 12px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 32px; font-weight: bold; text-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              🏢 BizStack
            </h1>
            <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">
              Business Management Platform
            </p>
          </div>
          
          <div style="background: white; padding: 40px 30px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
            <h2 style="color: #374151; margin: 0 0 20px 0; font-size: 24px; font-weight: 600;">
              Reset Your Password
            </h2>
            
            <p style="color: #6b7280; margin: 0 0 25px 0; font-size: 16px;">
              We received a request to reset your password for your BizStack account. Click the button below to create a new password:
            </p>
            
            <div style="text-align: center; margin: 35px 0;">
              <a href="${resetUrl}" 
                 style="display: inline-block; background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); color: white; text-decoration: none; padding: 16px 32px; border-radius: 8px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4); transition: all 0.3s ease;">
                Reset Password
              </a>
            </div>
            
            <p style="color: #9ca3af; font-size: 14px; margin: 25px 0 0 0; text-align: center; line-height: 1.5;">
              This link will expire in 1 hour for security reasons.<br>
              If you didn't request this reset, you can safely ignore this email.
            </p>
            
            <div style="border-top: 1px solid #e5e7eb; margin: 30px 0 0 0; padding: 20px 0 0 0;">
              <p style="color: #9ca3af; font-size: 12px; margin: 0; text-align: center;">
                © 2024 BizStack. All rights reserved.<br>
                This is an automated email, please do not reply.
              </p>
            </div>
          </div>
        </div>
      `,
    });

    console.log("Password reset email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error in send-password-reset function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);