
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { EmailConfig } from "./EmailConfigForm";
import { Button } from "./ui/button";
import { Trash2, RefreshCw, CheckCircle, XCircle } from "lucide-react";

type EmailConfigListProps = {
  configs: EmailConfig[];
  onDelete: (email: string) => void;
  onTest: (config: EmailConfig) => void;
};

const EmailConfigList = ({ configs, onDelete, onTest }: EmailConfigListProps) => {
  return (
    <Card className="p-6 animate-fade-up">
      <h2 className="text-lg font-semibold mb-4">Configured Email Accounts</h2>
      <ScrollArea className="h-[400px] pr-4">
        <div className="space-y-4">
          {configs.map((config) => (
            <Card
              key={config.emailAddress}
              className="p-4 hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="font-medium">{config.emailAddress}</div>
                  <div className="text-sm text-muted-foreground">
                    {config.connectionType} • {config.host}
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-muted-foreground">Connected</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onTest(config)}
                  >
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => onDelete(config.emailAddress)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
          {configs.length === 0 && (
            <div className="text-center text-muted-foreground py-8">
              No email configurations yet. Add one to get started.
            </div>
          )}
        </div>
      </ScrollArea>
    </Card>
  );
};

export default EmailConfigList;
