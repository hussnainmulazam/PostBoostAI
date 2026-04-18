import { Button } from "./ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { ArrowLeft, Upload, FileText, Image, File, Download, Trash2, Eye, Brain } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

interface DataManagementProps {
  onNavigate: (page: string) => void;
}

const files = [
  { id: 1, name: "Marketing_Plan_2025.pdf", type: "PDF", size: "2.4 MB", uploaded: "2 hours ago", status: "processed" },
  { id: 2, name: "Product_Images.zip", type: "ZIP", size: "45.2 MB", uploaded: "1 day ago", status: "processed" },
  { id: 3, name: "Customer_Data.csv", type: "CSV", size: "1.8 MB", uploaded: "3 days ago", status: "processed" },
  { id: 4, name: "Presentation.pptx", type: "PPTX", size: "12.5 MB", uploaded: "1 week ago", status: "processed" },
  { id: 5, name: "Budget_Report.xlsx", type: "XLSX", size: "3.2 MB", uploaded: "1 week ago", status: "processed" },
];

export function DataManagement({ onNavigate }: DataManagementProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [showSummary, setShowSummary] = useState(false);

  const handleFileUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setShowSummary(true);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  return (
    <div className="w-full p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => onNavigate('dashboard')}
            className="rounded-xl p-2 hover:bg-gray-100 transition-colors text-gray-500 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Data Management</h1>
            <p className="text-sm text-gray-500">Upload, manage, and analyze your files</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="border-gray-200 text-gray-700 hover:bg-gray-50">
            <Download className="w-4 h-4 mr-2" />
            Export All
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        {/* Drag & Drop Upload */}
        <div className="lg:col-span-2">
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragging(false);
              handleFileUpload();
            }}
            className={`rounded-2xl p-12 border-2 border-dashed transition-all bg-white ${
              isDragging 
                ? 'border-[#00F5FF] bg-[#00F5FF]/5 scale-[1.02]' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="text-center">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#00F5FF] to-[#3B82F6] flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-500/20">
                <Upload className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-xl font-semibold mb-2 text-gray-900">Drag & Drop Files</h2>
              <p className="text-gray-500 mb-6">or click to browse from your computer</p>
              <Button 
                onClick={handleFileUpload}
                className="bg-gradient-to-r from-[#00F5FF] to-[#3B82F6] text-white hover:opacity-90"
              >
                <Upload className="w-4 h-4 mr-2" />
                Select Files
              </Button>
              <p className="text-xs text-gray-400 mt-4">
                Supports PDF, DOC, XLS, CSV, Images, and more
              </p>
            </div>

            {isUploading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 rounded-xl border border-gray-200 bg-gray-50 p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Uploading document.pdf...</span>
                  <span className="text-sm text-gray-500">{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} className="h-2" />
              </motion.div>
            )}
          </div>
        </div>

        {/* Upload Stats */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 font-semibold text-gray-900">Storage Usage</h3>
            <div className="text-3xl font-bold mb-2 text-gray-900">64.8 GB</div>
            <p className="text-sm text-gray-500 mb-4">of 100 GB used</p>
            <Progress value={65} className="h-2 mb-2" />
            <p className="text-xs text-gray-400">35.2 GB remaining</p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 font-semibold text-gray-900">File Types</h3>
            <div className="space-y-3">
              {[
                { type: "Documents", count: 124, color: "#00F5FF" },
                { type: "Images", count: 89, color: "#3B82F6" },
                { type: "Spreadsheets", count: 45, color: "#C084FC" },
                { type: "Others", count: 32, color: "#80FFEA" },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-gray-700">{item.type}</span>
                  </div>
                  <span className="text-gray-900 font-medium">{item.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* AI Summary Card */}
      {showSummary && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-gray-200 bg-white p-6 mb-8 border-l-4 border-[#C084FC] shadow-sm"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#C084FC] to-[#3B82F6] flex items-center justify-center flex-shrink-0">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="mb-2 flex items-center gap-2 font-semibold text-gray-900">
                AI Document Summary
                <Badge className="bg-[#C084FC]/20 text-[#C084FC] border-0 hover:bg-[#C084FC]/30">New</Badge>
              </h3>
              <p className="text-gray-600 mb-3">
                I've analyzed your uploaded document. Here's a quick summary:
              </p>
              <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-700">
                <p className="mb-2">
                  <strong>Document Type:</strong> Marketing Plan
                </p>
                <p className="mb-2">
                  <strong>Key Topics:</strong> Q1 2025 Strategy, Social Media Campaigns, Budget Allocation
                </p>
                <p className="mb-2">
                  <strong>Actionable Items:</strong> 12 tasks identified, 3 deadlines upcoming
                </p>
                <p>
                  <strong>Suggestion:</strong> Consider creating task cards for the identified action items
                </p>
              </div>
              <div className="flex gap-2 mt-4">
                <Button size="sm" className="bg-gradient-to-r from-[#C084FC] to-[#3B82F6] text-white hover:opacity-90">
                  Create Tasks
                </Button>
                <Button variant="outline" size="sm" className="border-gray-200 text-gray-700 hover:bg-gray-50">
                  View Full Analysis
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Files Table */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold mb-1 text-gray-900">Your Files</h2>
            <p className="text-sm text-gray-500">{files.length} files total</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="border-gray-200 text-gray-700 hover:bg-gray-50">
              Filter
            </Button>
            <Button variant="outline" size="sm" className="border-gray-200 text-gray-700 hover:bg-gray-50">
              Sort
            </Button>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50 hover:bg-gray-50">
                <TableHead className="text-gray-600">File Name</TableHead>
                <TableHead className="text-gray-600">Type</TableHead>
                <TableHead className="text-gray-600">Size</TableHead>
                <TableHead className="text-gray-600">Uploaded</TableHead>
                <TableHead className="text-gray-600">Status</TableHead>
                <TableHead className="text-gray-600">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {files.map((file) => (
                <TableRow key={file.id} className="hover:bg-gray-50">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#00F5FF] to-[#3B82F6] flex items-center justify-center">
                        {file.type === 'PDF' && <FileText className="w-5 h-5 text-white" />}
                        {file.type === 'ZIP' && <File className="w-5 h-5 text-white" />}
                        {file.type === 'CSV' && <FileText className="w-5 h-5 text-white" />}
                        {file.type === 'PPTX' && <FileText className="w-5 h-5 text-white" />}
                        {file.type === 'XLSX' && <FileText className="w-5 h-5 text-white" />}
                      </div>
                      <span className="font-medium text-gray-900">{file.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-gray-600 border-gray-200">{file.type}</Badge>
                  </TableCell>
                  <TableCell className="text-gray-500">{file.size}</TableCell>
                  <TableCell className="text-gray-500">{file.uploaded}</TableCell>
                  <TableCell>
                    <Badge className="bg-green-100 text-green-600 border-0 hover:bg-green-200">
                      {file.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-900 hover:bg-gray-100">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-900 hover:bg-gray-100">
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-600 hover:bg-red-50">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
