import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { Copy, Upload } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface BankTransferButtonProps {
  amount: string;
  frequency?: string;
  designation: string;
  note?: string;
  onSuccess: (details: any) => void;
  onError: (error: Error) => void;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const BankTransferButton: React.FC<BankTransferButtonProps> = ({ 
  amount, 
  frequency,
  designation,
  note,
  onSuccess, 
  onError,
  disabled = false,
  className = '',
  children 
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleClick = () => {
    if (!disabled) {
      setIsDialogOpen(true);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "The bank details have been copied to your clipboard.",
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // Check if file is PDF or an image
      if (file.type.startsWith('image/') || file.type === 'application/pdf') {
        setUploadedFile(file);
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload a PDF or image file of your bank transfer statement.",
          variant: "destructive"
        });
      }
    }
  };

  const handleConfirm = async () => {
    if (!uploadedFile) {
      toast({
        title: "Missing bank statement",
        description: "Please upload your bank transfer statement before confirming.",
        variant: "destructive"
      });
      return;
    }

    setIsUploading(true);

    try {
      // In a real implementation, you would upload the file to your server or storage
      // For now, we'll simulate this with a timeout
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Create a transaction ID
      const transactionId = `BANK-${Math.random().toString(36).substring(2, 11)}`;
      
      setIsDialogOpen(false);
      onSuccess({
        id: transactionId,
        status: 'PENDING',
        method: 'bank_transfer',
        fileName: uploadedFile.name,
        amount: amount,
        frequency: frequency,
        designation: designation,
        note: note
      });

      toast({
        title: "Statement uploaded",
        description: "Your bank statement has been successfully uploaded. Your donation will be processed after verification.",
      });
    } catch (error) {
      onError(error);
      toast({
        title: "Upload failed",
        description: "There was an error uploading your bank statement. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>
      <Button 
        onClick={handleClick} 
        disabled={disabled || isUploading}
        className={`${className} ${isUploading ? 'opacity-70 cursor-not-allowed' : ''} relative`}
      >
        {isUploading ? (
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            Processing...
          </div>
        ) : (
          children || 'Pay with Bank Transfer'
        )}
      </Button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Bank Transfer Details</DialogTitle>
            <DialogDescription>
              Please use the following details to complete your bank transfer of ${amount}.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Bank Name:</p>
              <div className="flex items-center gap-2">
                <p className="text-sm">TD Bank</p>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8" 
                  onClick={() => handleCopy("TD Bank")}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Account Name:</p>
              <div className="flex items-center gap-2">
                <p className="text-sm">Ethiopia Orthodox Tewahedo Church North America Caribbean Latin America Archdiocese Sunday Schools Union (EOTC NACLAASSU)</p>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8" 
                  onClick={() => handleCopy("Ethiopia Orthodox Tewahedo Church North America Caribbean Latin America Archdiocese Sunday Schools Union (EOTC NACLAASSU)")}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Account Number:</p>
              <div className="flex items-center gap-2">
                <p className="text-sm">4377274067</p>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8" 
                  onClick={() => handleCopy("4377274067")}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Routing Number:</p>
              <div className="flex items-center gap-2">
                <p className="text-sm">054001725</p>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8" 
                  onClick={() => handleCopy("054001725")}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Reference:</p>
              <div className="flex items-center gap-2">
                <p className="text-sm">DONATION-{Math.random().toString(36).substring(2, 8).toUpperCase()}</p>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8" 
                  onClick={() => handleCopy(`DONATION-${Math.random().toString(36).substring(2, 8).toUpperCase()}`)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="border-t pt-4 mt-4">
              <Label htmlFor="bank-statement" className="block text-sm font-medium mb-2">
                Upload Bank Transfer Statement <span className="text-red-500">*</span>
              </Label>
              <div className="flex items-center gap-3">
                <Input
                  id="bank-statement"
                  type="file"
                  accept="image/*,application/pdf"
                  onChange={handleFileChange}
                  className="flex-1"
                />
                <Upload className="h-5 w-5 text-gray-500" />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Please upload a PDF or image of your completed bank transfer statement.
                This helps us verify your donation.
              </p>
              {uploadedFile && (
                <p className="text-sm text-green-600 mt-2">
                  ✓ {uploadedFile.name} selected
                </p>
              )}
            </div>
          </div>

          <DialogFooter className="flex flex-col sm:flex-row sm:justify-between">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleConfirm} 
              disabled={isUploading || !uploadedFile}
            >
              {isUploading ? "Uploading..." : "I've Made The Transfer"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BankTransferButton;