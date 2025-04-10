
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ImageIcon, Wand2Icon, ScissorsIcon } from "lucide-react";

export type ProcessingType = "unblur" | "restore" | "remove-bg";

interface ProcessingTypeSelectorProps {
  selectedType: ProcessingType;
  onChange: (type: ProcessingType) => void;
}

const ProcessingTypeSelector = ({ selectedType, onChange }: ProcessingTypeSelectorProps) => {
  return (
    <div className="mb-8 max-w-2xl mx-auto">
      <RadioGroup 
        value={selectedType} 
        onValueChange={(value) => onChange(value as ProcessingType)}
        className="flex flex-wrap justify-center gap-4 sm:gap-6"
      >
        <div className="relative">
          <RadioGroupItem 
            value="unblur" 
            id="unblur" 
            className="peer sr-only" 
          />
          <Label 
            htmlFor="unblur"
            className="flex flex-col items-center gap-2 rounded-xl border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
          >
            <ImageIcon className="h-10 w-10" />
            <div className="text-center">
              <p className="font-medium">Unblur Image</p>
              <p className="text-xs text-muted-foreground">Sharpen blurry photos</p>
            </div>
          </Label>
        </div>

        <div className="relative">
          <RadioGroupItem 
            value="restore" 
            id="restore" 
            className="peer sr-only" 
          />
          <Label 
            htmlFor="restore"
            className="flex flex-col items-center gap-2 rounded-xl border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
          >
            <Wand2Icon className="h-10 w-10" />
            <div className="text-center">
              <p className="font-medium">Restore Image</p>
              <p className="text-xs text-muted-foreground">Fix damaged photos</p>
            </div>
          </Label>
        </div>

        <div className="relative">
          <RadioGroupItem 
            value="remove-bg" 
            id="remove-bg" 
            className="peer sr-only" 
          />
          <Label 
            htmlFor="remove-bg"
            className="flex flex-col items-center gap-2 rounded-xl border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
          >
            <ScissorsIcon className="h-10 w-10" />
            <div className="text-center">
              <p className="font-medium">Remove Background</p>
              <p className="text-xs text-muted-foreground">Extract subject from background</p>
            </div>
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
};

export default ProcessingTypeSelector;
