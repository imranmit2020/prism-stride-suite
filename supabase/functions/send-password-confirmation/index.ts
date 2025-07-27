import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface PasswordConfirmationRequest {
  email: string;
  userName?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, userName }: PasswordConfirmationRequest = await req.json();

    const emailResponse = await resend.emails.send({
      from: "BizStack <noreply@yourdomain.com>",
      to: [email],
      subject: "Password Changed Successfully - BizStack",
      html: `
        <div style="max-width: 600px; margin: 0 auto; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333;">
          <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 40px 30px; text-align: center; border-radius: 12px 12px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 32px; font-weight: bold; text-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              🏢 BizStack
            </h1>
            <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">
              Business Management Platform
            </p>
          </div>
          
          <div style="background: white; padding: 40px 30px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
            <div style="text-align: center; margin: 0 0 30px 0;">
              <div style="display: inline-block; width: 80px; height: 80px; background: linear-gradient(135deg, #10b981 0%, #059669 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 0 20px 0;">
                <span style="color: white; font-size: 36px;">✓</span>
              </div>
            </div>
            
            <h2 style="color: #374151; margin: 0 0 20px 0; font-size: 24px; font-weight: 600; text-align: center;">
              Password Changed Successfully
            </h2>
            
            <p style="color: #6b7280; margin: 0 0 25px 0; font-size: 16px; text-align: center;">
              ${userName ? `Hi ${userName}, your` : 'Your'} BizStack account password has been successfully updated.
            </p>
            
            <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 25px 0;">
              <p style="color: #374151; margin: 0; font-size: 14px;">
                <strong>Security Tips:</strong><br>
                • Keep your password secure and don't share it with anyone<br>
                • Consider using a password manager for better security<br>
                • Log out of your account when using shared devices
              </p>
            </div>
            
            <div style="text-align: center; margin: 35px 0;">
              <a href="${process.env.SITE_URL || 'https://yourdomain.com'}" 
                 style="display: inline-block; background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); color: white; text-decoration: none; padding: 16px 32px; border-radius: 8px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);">
                Access Your Account
              </a>
            </div>
            
            <p style="color: #dc2626; font-size: 14px; margin: 25px 0 0 0; text-align: center; line-height: 1.5; background: #fef2f2; padding: 15px; border-radius: 6px; border-left: 4px solid #dc2626;">
              <strong>⚠️ Security Alert:</strong><br>
              If you didn't change your password, please contact support immediately and secure your account.
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

    console.log("Password confirmation email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error in send-password-confirmation function:", error);
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