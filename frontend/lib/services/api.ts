import type {
  Application,
  AssessmentStatus,
  AssessmentResult,
  ProcessingStage,
} from '@/lib/types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

// Mock data generators for comprehensive dataset
export const generateMockApplication = (id: string): Application => ({
  id,
  status: 'submitted',
  personalInfo: {
    firstName: 'James',
    lastName: 'Mitchell',
    email: 'james.mitchell@example.com',
    phone: '(555) 123-4567',
    dateOfBirth: '1985-06-15',
    ssn: '123-45-6789',
    address: '1247 Oak Street',
    city: 'San Francisco',
    state: 'CA',
    zipCode: '94103',
  },
  employmentInfo: {
    employmentStatus: 'Employed',
    jobTitle: 'Senior Software Engineer',
    employer: 'TechCorp Industries',
    industry: 'Technology',
    yearsEmployed: 7,
    monthlyIncome: 12500,
  },
  financialInfo: {
    creditScore: 745,
    totalDebt: 45000,
    monthlyExpenses: 4200,
    savingsAmount: 125000,
    assetValue: 350000,
    bankruptcyHistory: false,
  },
  loanRequest: {
    loanAmount: 300000,
    loanPurpose: 'Home Purchase',
    loanTerm: 360,
    interestRate: 6.5,
  },
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});

const PIPELINE_STAGES: ProcessingStage[] = [
  'document_ocr',
  'feature_extraction',
  'similarity_search',
  'model_ensemble',
  'risk_aggregation',
  'explanation_generation',
];

const STAGE_DURATIONS: Record<ProcessingStage, number> = {
  document_ocr: 2000,
  feature_extraction: 3000,
  similarity_search: 4000,
  model_ensemble: 5000,
  risk_aggregation: 3000,
  explanation_generation: 2000,
};

const STAGE_DESCRIPTIONS: Record<ProcessingStage, string> = {
  document_ocr: 'Extracting text and data from uploaded documents using OCR technology',
  feature_extraction: 'Computing financial and employment features from application data',
  similarity_search: 'Finding similar historical cases using Qdrant vector database',
  model_ensemble: 'Running ensemble of ML models for risk scoring',
  risk_aggregation: 'Aggregating risk signals and computing final risk score',
  explanation_generation: 'Generating AI-powered explanations for the assessment',
};

export const generateMockAssessmentStatus = (
  applicationId: string,
  stageIndex: number
): AssessmentStatus => {
  const stages = PIPELINE_STAGES.map((stage, idx) => ({
    stage,
    status: idx < stageIndex ? ('completed' as const) : idx === stageIndex ? ('in_progress' as const) : ('pending' as const),
    progress:
      idx < stageIndex
        ? 100
        : idx === stageIndex
          ? Math.floor(Math.random() * 70) + 20
          : 0,
    estimatedTimeMs: STAGE_DURATIONS[stage],
    startedAt: idx <= stageIndex ? new Date().toISOString() : undefined,
    completedAt: idx < stageIndex ? new Date().toISOString() : undefined,
  }));

  const overallProgress = Math.round(
    stages.reduce((sum, s) => sum + s.progress, 0) / stages.length
  );

  return {
    id: `assessment_${applicationId}`,
    applicationId,
    currentStage: PIPELINE_STAGES[Math.min(stageIndex, PIPELINE_STAGES.length - 1)],
    stages,
    overallProgress,
    status: stageIndex < PIPELINE_STAGES.length ? 'processing' : 'completed',
  };
};

export const generateMockAssessmentResult = (
  applicationId: string
): AssessmentResult => {
  const creditScore = 745;
  const debtToIncomeRatio = 0.336;
  const employmentStability = 0.85;
  const savingsRatio = 2.98;

  const overallScore = Math.round(
    (creditScore / 850) * 0.4 +
      (1 - Math.min(debtToIncomeRatio, 1)) * 0.25 +
      employmentStability * 0.2 +
      Math.min(savingsRatio / 3, 1) * 0.15
  );

  return {
    id: `result_${applicationId}`,
    applicationId,
    riskScore: {
      overallScore,
      level: overallScore > 70 ? 'low' : overallScore > 40 ? 'medium' : 'high',
      confidence: 0.92,
      factors: [
        {
          name: 'Credit Score',
          impact: 0.35,
          direction: 'positive',
          explanation: 'Excellent credit history with 745 FICO score',
        },
        {
          name: 'Debt-to-Income Ratio',
          impact: 0.25,
          direction: 'positive',
          explanation: 'Low DTI of 33.6% indicates strong repayment capacity',
        },
        {
          name: 'Employment Stability',
          impact: 0.2,
          direction: 'positive',
          explanation: '7 years with current employer shows stability',
        },
        {
          name: 'Savings Reserve',
          impact: 0.15,
          direction: 'positive',
          explanation: 'Substantial savings of $125K provides safety buffer',
        },
        {
          name: 'Loan-to-Value Ratio',
          impact: 0.05,
          direction: 'positive',
          explanation: '85.7% LTV on $350K asset value',
        },
      ],
    },
    modelContributions: [
      {
        modelName: 'Gradient Boosting Model',
        weight: 0.35,
        score: 82,
        confidence: 0.95,
      },
      {
        modelName: 'Neural Network Classifier',
        weight: 0.3,
        score: 78,
        confidence: 0.88,
      },
      {
        modelName: 'Random Forest Ensemble',
        weight: 0.2,
        score: 75,
        confidence: 0.92,
      },
      {
        modelName: 'Logistic Regression',
        weight: 0.15,
        score: 80,
        confidence: 0.85,
      },
    ],
    similarCases: [
      {
        id: 'case_001',
        similarity: 0.94,
        applicantProfile: 'Tech professional, 7 years employment',
        loanAmount: 280000,
        outcome: 'approved',
        riskScore: 78,
      },
      {
        id: 'case_002',
        similarity: 0.91,
        applicantProfile: 'Senior engineer, strong savings',
        loanAmount: 320000,
        outcome: 'approved',
        riskScore: 81,
      },
      {
        id: 'case_003',
        similarity: 0.88,
        applicantProfile: 'Similar income and credit profile',
        loanAmount: 300000,
        outcome: 'approved',
        riskScore: 76,
      },
      {
        id: 'case_004',
        similarity: 0.85,
        applicantProfile: 'Tech industry, solid financials',
        loanAmount: 290000,
        outcome: 'approved',
        riskScore: 74,
      },
    ],
    anomalies: [
      {
        id: 'anomaly_001',
        severity: 'low',
        title: 'Recent Hard Inquiry',
        description: 'Credit report shows hard inquiry from 2 months ago',
        recommendation: 'Monitor for additional credit-seeking behavior',
      },
      {
        id: 'anomaly_002',
        severity: 'low',
        title: 'Geographic Factor',
        description: 'Applicant in high cost-of-living area',
        recommendation: 'Consider market conditions in assessment',
      },
    ],
    explanation:
      'Applicant presents strong credit profile with excellent financial stability. High credit score, low debt-to-income ratio, and substantial savings reserve indicate strong repayment capacity. Employment history demonstrates stability in high-paying tech sector.',
    recommendations: [
      'Approve with standard terms',
      'Consider interest rate reduction based on credit score',
      'Fast-track processing due to low risk profile',
      'Monitor employment status during loan tenure',
    ],
  };
};

// API calls (mocked for now)
export const createApplication = async (data: Partial<Application>): Promise<Application> => {
  // In production, this would call: POST /api/applications
  return new Promise((resolve) => {
    setTimeout(() => {
      const app = generateMockApplication(`app_${Date.now()}`);
      resolve({ ...app, ...data });
    }, 500);
  });
};

export const getApplication = async (id: string): Promise<Application> => {
  // In production: GET /api/applications/:id
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(generateMockApplication(id));
    }, 300);
  });
};

export const startAssessment = async (applicationId: string): Promise<AssessmentStatus> => {
  // In production: POST /api/assessments/start
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(generateMockAssessmentStatus(applicationId, 0));
    }, 500);
  });
};

export const getAssessmentStatus = async (assessmentId: string): Promise<AssessmentStatus> => {
  // In production: GET /api/assessments/:id/status (polled every 2s)
  return new Promise((resolve) => {
    setTimeout(() => {
      const applicationId = assessmentId.replace('assessment_', '');
      const stageIndex = Math.floor(Math.random() * 7);
      resolve(generateMockAssessmentStatus(applicationId, stageIndex));
    }, 200);
  });
};

export const getAssessmentResult = async (assessmentId: string): Promise<AssessmentResult> => {
  // In production: GET /api/assessments/:id/result
  return new Promise((resolve) => {
    setTimeout(() => {
      const applicationId = assessmentId.replace('assessment_', '');
      resolve(generateMockAssessmentResult(applicationId));
    }, 300);
  });
};

export const submitDecision = async (
  assessmentId: string,
  decision: 'approved' | 'rejected' | 'manual_review'
): Promise<AssessmentResult> => {
  // In production: POST /api/assessments/:id/decision
  return new Promise((resolve) => {
    setTimeout(() => {
      const applicationId = assessmentId.replace('assessment_', '');
      const result = generateMockAssessmentResult(applicationId);
      resolve({ ...result, decision });
    }, 500);
  });
};

export const uploadDocument = async (
  applicationId: string,
  file: File
): Promise<{ documentId: string; fileName: string }> => {
  // In production: POST /api/documents/upload
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        documentId: `doc_${Date.now()}`,
        fileName: file.name,
      });
    }, 800);
  });
};
