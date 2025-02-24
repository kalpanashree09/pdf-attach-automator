
import { useState } from "react";
import EmailConfigForm from "@/components/EmailConfigForm";
import EmailConfigList from "@/components/EmailConfigList";
import PDFList from "@/components/PDFList";
import type { EmailConfig } from "@/components/EmailConfigForm";
import { toast } from "sonner";
import { MoonIcon, SunIcon, Mail, FileDown } from "lucide-react";
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
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-muted/30 transition-colors duration-500">
      <div className="max-w-6xl mx-auto p-6 md:p-8 space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-4 py-8">
          <div className="flex items-center justify-center gap-4 animate-fade-in">
            <div className="p-3 glass-card rounded-xl">
              <Mail className="h-8 w-8 text-primary animate-float" />
            </div>
            <div className="p-3 glass-card rounded-xl">
              <FileDown className="h-8 w-8 text-primary animate-float animation-delay-200" />
            </div>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-gradient animate-fade-in">
            Email & PDF Manager
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-in animation-delay-200">
            Streamline your document workflow by automatically downloading PDF attachments from your email accounts
          </p>
        </div>

        <div className="flex justify-end">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="animate-fade-in glass-card"
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
