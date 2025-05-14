export interface TemplateContextType {
  activeTemplate: number;
  setActiveTemplate: React.Dispatch<React.SetStateAction<number>>;
  images:string[];
  setImages:React.Dispatch<React.SetStateAction<string[]>>;
}