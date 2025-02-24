
import { useState } from "react";
import EmailConfigForm from "@/components/EmailConfigForm";
import EmailConfigList from "@/components/EmailConfigList";
import PDFList from "@/components/PDFList";
import type { EmailConfig } from "@/components/EmailConfigForm";
import { toast } from "sonner";

const Index = () => {
  const [configs, setConfigs] = useState<EmailConfig[]>([]);
  const [pdfs] = useState([
    {
      filename: "sample.pdf",
      fromAddress: "test@example.com",
      dateReceived: new Date().toISOString(),
      subject: "Test PDF Document",
    },
  ]);

  const handleAddConfig = (config: EmailConfig) => {
    if (configs.some((c) => c.emailAddress === config.emailAddress)) {
      toast.error("This email is already configured");
      return;
    }
    setConfigs([...configs, config]);
  };

  const handleDeleteConfig = (email: string) => {
    setConfigs(configs.filter((c) => c.emailAddress !== email));
    toast.success("Email configuration removed");
  };

  const handleTestConfig = (config: EmailConfig) => {
    // In a real application, this would test the connection
    toast.success(`Successfully tested connection for ${config.emailAddress}`);
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Email & PDF Manager</h1>
          <p className="text-muted-foreground">
            Configure email accounts to automatically download PDF attachments
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-lg font-semibold">Add New Configuration</h2>
              <p className="text-sm text-muted-foreground">
                Enter your email credentials to start downloading PDFs
              </p>
            </div>
            <EmailConfigForm onSubmit={handleAddConfig} />
          </div>

          <div className="space-y-6">
            <EmailConfigList
              configs={configs}
              onDelete={handleDeleteConfig}
              onTest={handleTestConfig}
            />
          </div>
        </div>

        <PDFList pdfs={pdfs} />
      </div>
    </div>
  );
};

export default Index;
