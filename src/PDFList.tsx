
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileDown } from "lucide-react";

type PDF = {
  filename: string;
  fromAddress: string;
  dateReceived: string;
  subject: string;
};

type PDFListProps = {
  pdfs: PDF[];
};

const PDFList = ({ pdfs }: PDFListProps) => {
  return (
    <Card className="p-6 animate-fade-up shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gradient-to-br from-card via-card/95 to-card/90">
      <h2 className="text-2xl font-semibold mb-4 tracking-tight text-gradient">Recent PDF Downloads</h2>
      <ScrollArea className="h-[400px] pr-4">
        <div className="space-y-4">
          {pdfs.map((pdf, index) => (
            <Card
              key={pdf.filename}
              className="p-4 hover:shadow-md transition-all duration-300 hover:-translate-y-1 bg-card/50 backdrop-blur-sm border border-border/50"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-primary/10 rounded-xl hover:scale-105 transition-transform duration-200 group">
                  <FileDown className="h-6 w-6 text-primary group-hover:text-primary/80 transition-colors" />
                </div>
                <div className="flex-1 space-y-1.5">
                  <div className="font-medium text-lg tracking-tight">{pdf.filename}</div>
                  <div className="text-sm text-muted-foreground/90">
                    From: {pdf.fromAddress}
                  </div>
                  <div className="text-sm text-muted-foreground/90">
                    Subject: {pdf.subject}
                  </div>
                  <div className="text-sm text-muted-foreground/90">
                    Received: {new Date(pdf.dateReceived).toLocaleString()}
                  </div>
                </div>
              </div>
            </Card>
          ))}
          {pdfs.length === 0 && (
            <div className="text-center text-muted-foreground py-12 animate-fade-in">
              <FileDown className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
              No PDFs downloaded yet. Configure an email account to start receiving PDFs.
            </div>
          )}
        </div>
      </ScrollArea>
    </Card>
  );
};

export default PDFList;
