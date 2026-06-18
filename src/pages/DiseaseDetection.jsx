import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FiUpload, FiActivity, FiAlertCircle, FiCheckCircle } from 'react-icons/fi'
import DashboardLayout from '../components/layout/DashboardLayout'
import Button from '../components/common/Button'
import Card from '../components/common/Card'

const DiseaseDetection = () => {
  const [selectedFile, setSelectedFile] = useState(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState(null)

  const handleFileSelect = (e) => {
    const file = e.target.files[0]
    if (file) {
      setSelectedFile(file)
      setResult(null)
    }
  }

  const handleAnalyze = () => {
    setIsAnalyzing(true)
    setTimeout(() => {
      setResult({
        disease: 'Wheat Leaf Rust',
        severity: 'High',
        confidence: 0.92,
        treatment: 'Apply fungicide containing triazole. Remove infected leaves. Improve air circulation.',
        affectedArea: '35%',
      })
      setIsAnalyzing(false)
    }, 2000)
  }

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Disease Detection
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Upload plant images to detect diseases using AI
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <Card>
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  Upload Image
                </h2>

                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 text-center hover:border-primary-500 transition-colors">
                  {selectedFile ? (
                    <div>
                      <div className="text-6xl mb-4">📸</div>
                      <p className="text-gray-900 dark:text-white font-medium mb-2">
                        {selectedFile.name}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                        {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setSelectedFile(null)
                          setResult(null)
                        }}
                      >
                        Remove
                      </Button>
                    </div>
                  ) : (
                    <div>
                      <FiUpload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Drag and drop an image here, or click to select
                      </p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileSelect}
                        className="hidden"
                        id="file-upload"
                      />
                      <label htmlFor="file-upload">
                        <Button as="span">Select Image</Button>
                      </label>
                    </div>
                  )}
                </div>

                {selectedFile && !result && (
                  <Button
                    size="lg"
                    fullWidth
                    icon={FiActivity}
                    loading={isAnalyzing}
                    onClick={handleAnalyze}
                    className="mt-6"
                  >
                    Analyze Image
                  </Button>
                )}
              </div>
            </Card>

            <Card className="mt-6">
              <div className="p-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                  Tips for Best Results
                </h3>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li>• Use clear, well-lit images</li>
                  <li>• Focus on affected areas</li>
                  <li>• Avoid blurry or dark photos</li>
                  <li>• Include both healthy and affected parts</li>
                </ul>
              </div>
            </Card>
          </div>

          <div>
            {result ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Card>
                  <div className="p-6">
                    <div className="flex items-center space-x-3 mb-6">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        result.severity === 'High' ? 'bg-red-100 dark:bg-red-900/20' : 'bg-yellow-100 dark:bg-yellow-900/20'
                      }`}>
                        {result.severity === 'High' ? (
                          <FiAlertCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
                        ) : (
                          <FiCheckCircle className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                        )}
                      </div>
                      <div>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                          {result.disease}
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Severity: {result.severity} • Confidence: {(result.confidence * 100).toFixed(0)}%
                        </p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                          Affected Area
                        </h3>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                          <div
                            className={`h-4 rounded-full ${
                              result.severity === 'High' ? 'bg-red-500' : 'bg-yellow-500'
                            }`}
                            style={{ width: `${result.affectedArea}%` }}
                          />
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          {result.affectedArea} of plant affected
                        </p>
                      </div>

                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                          Recommended Treatment
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          {result.treatment}
                        </p>
                      </div>

                      <div className="flex space-x-3">
                        <Button size="lg" fullWidth>
                          Get Treatment Products
                        </Button>
                        <Button size="lg" variant="outline" fullWidth>
                          Save Report
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ) : (
              <Card>
                <div className="p-12 text-center">
                  <FiActivity className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    No Analysis Yet
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Upload an image to start disease detection
                  </p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </motion.div>
    </DashboardLayout>
  )
}

export default DiseaseDetection
