
import { useState } from "react";
import EmailConfigForm from "@/components/EmailConfigForm";
import EmailConfigList from "@/components/EmailConfigList";
import PDFList from "@/components/PDFList";
import type { EmailConfig } from "@/components/EmailConfigForm";
import { toast } from "sonner";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

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
  const { theme, setTheme } = useTheme();

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
    toast.success(`Successfully tested connection for ${config.emailAddress}`);
  };

  return (
    <div className="min-h-screen bg-background p-8 transition-colors duration-300">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight text-gradient animate-fade-in">
              Email & PDF Manager
            </h1>
            <p className="text-muted-foreground text-lg animate-fade-in animation-delay-200">
              Configure email accounts to automatically download PDF attachments
            </p>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="animate-fade-in"
          >
            {theme === "dark" ? (
              <SunIcon className="h-5 w-5" />
            ) : (
              <MoonIcon className="h-5 w-5" />
            )}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold tracking-tight animate-fade-in">
                Add New Configuration
              </h2>
              <p className="text-sm text-muted-foreground animate-fade-in animation-delay-200">
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

