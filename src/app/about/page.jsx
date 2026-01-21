'use client'
import React, { useState } from 'react';
import { Download, CheckSquare, Square, Calendar, Target, BookOpen, Code, Briefcase } from 'lucide-react';

const RoadmapPDF = () => {
  const [activeWeek, setActiveWeek] = useState(1);

  const roadmapData = {
    overview: {
      title: "AI/ML Engineer Transformation Journey",
      duration: "3 Months (90 Days)",
      commitment: "2-3 hours daily",
      goal: "Job-ready AI/ML Engineer with practical project portfolio"
    },
    weeks: [
      // MONTH 1 - FOUNDATIONS
      {
        week: 1,
        month: 1,
        title: "Python for ML & Math Foundations",
        focus: "Core Programming & Mathematics",
        days: [
          {
            day: 1,
            tasks: [
              "Set up Python environment (Anaconda/Jupyter)",
              "NumPy basics: arrays, operations, broadcasting (1.5 hrs)",
              "Practice: Create matrix operations program (1 hr)",
              "Reading: Linear algebra refresher (30 min)"
            ],
            project: "Build a basic matrix calculator",
            notes: ""
          },
          {
            day: 2,
            tasks: [
              "Pandas fundamentals: DataFrames, Series (1.5 hrs)",
              "Data manipulation: filtering, grouping, merging (1 hr)",
              "Practice: Load and analyze CSV dataset (1 hr)"
            ],
            project: "Analyze Titanic dataset - data exploration",
            notes: ""
          },
          {
            day: 3,
            tasks: [
              "Matplotlib & Seaborn basics (1 hr)",
              "Create visualizations: line, bar, scatter, histograms (1 hr)",
              "Mini project: Visualize dataset insights (1 hr)"
            ],
            project: "Create COVID-19 data visualization dashboard",
            notes: ""
          },
          {
            day: 4,
            tasks: [
              "Probability & statistics basics (1 hr)",
              "Distributions, mean, median, standard deviation (1 hr)",
              "Practice: Statistical analysis on real dataset (1 hr)"
            ],
            project: "Statistical analysis of sales data",
            notes: ""
          },
          {
            day: 5,
            tasks: [
              "Linear algebra: vectors, matrices, dot products (1.5 hrs)",
              "Calculus basics: derivatives, gradients (1 hr)",
              "Practice problems (30 min)"
            ],
            project: "Implement gradient descent from scratch",
            notes: ""
          },
          {
            day: 6,
            tasks: [
              "Review week's concepts (1 hr)",
              "Work on mini-project integration (1.5 hrs)",
              "Documentation and GitHub setup (30 min)"
            ],
            project: "Combine all week's projects into portfolio",
            notes: ""
          },
          {
            day: 7,
            tasks: [
              "Rest day or catch up on incomplete tasks",
              "Review notes and prepare for next week",
              "Optional: Explore Kaggle datasets"
            ],
            project: "Reflection and planning",
            notes: ""
          }
        ]
      },
      {
        week: 2,
        month: 1,
        title: "Introduction to Machine Learning",
        focus: "ML Fundamentals & Scikit-learn",
        days: [
          {
            day: 8,
            tasks: [
              "ML concepts: supervised vs unsupervised learning (1 hr)",
              "Train-test split, cross-validation basics (1 hr)",
              "First ML model: Linear Regression with scikit-learn (1 hr)"
            ],
            project: "House price prediction model",
            notes: ""
          },
          {
            day: 9,
            tasks: [
              "Feature engineering & scaling (1 hr)",
              "Evaluation metrics: MSE, RMSE, R² (1 hr)",
              "Improve yesterday's model (1 hr)"
            ],
            project: "Enhanced house price predictor with features",
            notes: ""
          },
          {
            day: 10,
            tasks: [
              "Classification basics: Logistic Regression (1 hr)",
              "Confusion matrix, accuracy, precision, recall (1 hr)",
              "Build binary classifier (1 hr)"
            ],
            project: "Email spam detector",
            notes: ""
          },
          {
            day: 11,
            tasks: [
              "Decision Trees and Random Forests (1.5 hrs)",
              "Feature importance analysis (1 hr)",
              "Practice: Classification problem (30 min)"
            ],
            project: "Customer churn prediction",
            notes: ""
          },
          {
            day: 12,
            tasks: [
              "Support Vector Machines (SVM) (1 hr)",
              "K-Nearest Neighbors (KNN) (1 hr)",
              "Model comparison on same dataset (1 hr)"
            ],
            project: "Iris flower classification - compare models",
            notes: ""
          },
          {
            day: 13,
            tasks: [
              "Unsupervised learning: K-Means clustering (1.5 hrs)",
              "Dimensionality reduction: PCA (1 hr)",
              "Practice: Customer segmentation (30 min)"
            ],
            project: "Customer segmentation system",
            notes: ""
          },
          {
            day: 14,
            tasks: [
              "Week review and consolidation (1 hr)",
              "Create comprehensive ML pipeline (1.5 hrs)",
              "GitHub portfolio update (30 min)"
            ],
            project: "End-to-end ML pipeline project",
            notes: ""
          }
        ]
      },
      {
        week: 3,
        month: 1,
        title: "Deep Learning Foundations",
        focus: "Neural Networks & TensorFlow/Keras",
        days: [
          {
            day: 15,
            tasks: [
              "Neural network basics: perceptrons, activation functions (1 hr)",
              "Install TensorFlow/Keras (30 min)",
              "Build first neural network: MNIST digits (1.5 hrs)"
            ],
            project: "Handwritten digit recognizer",
            notes: ""
          },
          {
            day: 16,
            tasks: [
              "Backpropagation and gradient descent explained (1 hr)",
              "Loss functions and optimizers (1 hr)",
              "Experiment with different architectures (1 hr)"
            ],
            project: "Optimize MNIST model performance",
            notes: ""
          },
          {
            day: 17,
            tasks: [
              "Convolutional Neural Networks (CNN) theory (1 hr)",
              "Build CNN for image classification (1.5 hrs)",
              "Data augmentation techniques (30 min)"
            ],
            project: "CIFAR-10 image classifier",
            notes: ""
          },
          {
            day: 18,
            tasks: [
              "Overfitting and regularization (dropout, L2) (1 hr)",
              "Batch normalization (1 hr)",
              "Improve CNN model (1 hr)"
            ],
            project: "Cat vs Dog classifier with regularization",
            notes: ""
          },
          {
            day: 19,
            tasks: [
              "Transfer learning concepts (1 hr)",
              "Use pre-trained models (VGG, ResNet) (1.5 hrs)",
              "Fine-tuning techniques (30 min)"
            ],
            project: "Custom image classifier using transfer learning",
            notes: ""
          },
          {
            day: 20,
            tasks: [
              "Introduction to RNNs and LSTMs (1.5 hrs)",
              "Text preprocessing basics (1 hr)",
              "Simple sentiment analysis (30 min)"
            ],
            project: "Movie review sentiment analyzer",
            notes: ""
          },
          {
            day: 21,
            tasks: [
              "Week review: neural network concepts (1 hr)",
              "Build comprehensive DL project (1.5 hrs)",
              "Portfolio documentation (30 min)"
            ],
            project: "Multi-class image classification web app",
            notes: ""
          }
        ]
      },
      {
        week: 4,
        month: 1,
        title: "Natural Language Processing Basics",
        focus: "NLP Fundamentals & Text Processing",
        days: [
          {
            day: 22,
            tasks: [
              "Text preprocessing: tokenization, lemmatization (1 hr)",
              "Bag of Words and TF-IDF (1 hr)",
              "Build text classifier (1 hr)"
            ],
            project: "News article categorizer",
            notes: ""
          },
          {
            day: 23,
            tasks: [
              "Word embeddings: Word2Vec, GloVe (1.5 hrs)",
              "Implement word embeddings in model (1 hr)",
              "Visualization with t-SNE (30 min)"
            ],
            project: "Word similarity finder",
            notes: ""
          },
          {
            day: 24,
            tasks: [
              "Sequence models for NLP: LSTM text generation (1.5 hrs)",
              "Text generation techniques (1 hr)",
              "Experiment with different datasets (30 min)"
            ],
            project: "Poetry/text generator",
            notes: ""
          },
          {
            day: 25,
            tasks: [
              "Introduction to Transformers (1 hr)",
              "Attention mechanism explained (1 hr)",
              "Use Hugging Face library basics (1 hr)"
            ],
            project: "Sentiment analysis with BERT",
            notes: ""
          },
          {
            day: 26,
            tasks: [
              "Named Entity Recognition (NER) (1 hr)",
              "Text summarization basics (1 hr)",
              "Question answering systems (1 hr)"
            ],
            project: "Document Q&A system",
            notes: ""
          },
          {
            day: 27,
            tasks: [
              "Chatbot fundamentals (1 hr)",
              "Build rule-based chatbot (1 hr)",
              "Improve with ML/DL (1 hr)"
            ],
            project: "Customer service chatbot",
            notes: ""
          },
          {
            day: 28,
            tasks: [
              "Month 1 review and consolidation (1.5 hrs)",
              "Update portfolio with all projects (1 hr)",
              "Plan Month 2 focus areas (30 min)"
            ],
            project: "Month 1 portfolio presentation",
            notes: ""
          }
        ]
      },
      // MONTH 2 - INTERMEDIATE & SPECIALIZATION
      {
        week: 5,
        month: 2,
        title: "Advanced Deep Learning",
        focus: "GANs, Autoencoders & Advanced Architectures",
        days: [
          {
            day: 29,
            tasks: [
              "Autoencoder architecture and applications (1 hr)",
              "Build basic autoencoder (1.5 hrs)",
              "Dimensionality reduction comparison (30 min)"
            ],
            project: "Image denoising autoencoder",
            notes: ""
          },
          {
            day: 30,
            tasks: [
              "Variational Autoencoders (VAE) theory (1 hr)",
              "Implement VAE for image generation (1.5 hrs)",
              "Latent space exploration (30 min)"
            ],
            project: "Face generator with VAE",
            notes: ""
          },
          {
            day: 31,
            tasks: [
              "Generative Adversarial Networks (GAN) basics (1 hr)",
              "Build simple GAN (1.5 hrs)",
              "Training challenges and solutions (30 min)"
            ],
            project: "MNIST digit generator GAN",
            notes: ""
          },
          {
            day: 32,
            tasks: [
              "DCGAN architecture (1 hr)",
              "Advanced GAN techniques (1 hr)",
              "Generate higher quality images (1 hr)"
            ],
            project: "Anime face generator",
            notes: ""
          },
          {
            day: 33,
            tasks: [
              "Object detection: YOLO concepts (1 hr)",
              "Implement object detection (1.5 hrs)",
              "Real-time detection experiments (30 min)"
            ],
            project: "Real-time object detector",
            notes: ""
          },
          {
            day: 34,
            tasks: [
              "Image segmentation: U-Net architecture (1 hr)",
              "Semantic vs instance segmentation (1 hr)",
              "Build segmentation model (1 hr)"
            ],
            project: "Medical image segmentation",
            notes: ""
          },
          {
            day: 35,
            tasks: [
              "Week consolidation (1 hr)",
              "Combine concepts into complex project (1.5 hrs)",
              "Documentation (30 min)"
            ],
            project: "Advanced computer vision pipeline",
            notes: ""
          }
        ]
      },
      {
        week: 6,
        month: 2,
        title: "MLOps & Deployment",
        focus: "Production ML Systems",
        days: [
          {
            day: 36,
            tasks: [
              "MLOps principles and workflow (1 hr)",
              "Experiment tracking with MLflow (1 hr)",
              "Version control for ML (1 hr)"
            ],
            project: "Set up ML experiment tracking system",
            notes: ""
          },
          {
            day: 37,
            tasks: [
              "Model serialization: pickle, joblib, ONNX (1 hr)",
              "Build REST API with Flask/FastAPI (1.5 hrs)",
              "Test API endpoints (30 min)"
            ],
            project: "ML model API deployment",
            notes: ""
          },
          {
            day: 38,
            tasks: [
              "Docker basics for ML (1 hr)",
              "Containerize ML application (1.5 hrs)",
              "Docker Compose for multi-container (30 min)"
            ],
            project: "Dockerized ML application",
            notes: ""
          },
          {
            day: 39,
            tasks: [
              "Deploy to cloud: AWS/GCP/Azure basics (1 hr)",
              "Deploy model to cloud platform (1.5 hrs)",
              "Monitoring and logging setup (30 min)"
            ],
            project: "Cloud-deployed ML service",
            notes: ""
          },
          {
            day: 40,
            tasks: [
              "CI/CD for ML pipelines (1 hr)",
              "GitHub Actions for ML (1 hr)",
              "Automated testing for models (1 hr)"
            ],
            project: "Automated ML pipeline",
            notes: ""
          },
          {
            day: 41,
            tasks: [
              "Model monitoring and drift detection (1 hr)",
              "A/B testing for models (1 hr)",
              "Performance optimization (1 hr)"
            ],
            project: "Model monitoring dashboard",
            notes: ""
          },
          {
            day: 42,
            tasks: [
              "Build end-to-end production system (2 hrs)",
              "Documentation and best practices (1 hr)"
            ],
            project: "Complete MLOps pipeline project",
            notes: ""
          }
        ]
      },
      {
        week: 7,
        month: 2,
        title: "Large Language Models & Modern NLP",
        focus: "LLMs, Fine-tuning & Prompt Engineering",
        days: [
          {
            day: 43,
            tasks: [
              "Transformer architecture deep dive (1 hr)",
              "GPT and BERT comparison (1 hr)",
              "Hugging Face Transformers library (1 hr)"
            ],
            project: "Text classification with transformers",
            notes: ""
          },
          {
            day: 44,
            tasks: [
              "Prompt engineering fundamentals (1 hr)",
              "Few-shot and zero-shot learning (1 hr)",
              "Build applications with LLM APIs (1 hr)"
            ],
            project: "LLM-powered application",
            notes: ""
          },
          {
            day: 45,
            tasks: [
              "Fine-tuning basics (1 hr)",
              "Parameter-efficient fine-tuning (LoRA, PEFT) (1 hr)",
              "Fine-tune small model on custom data (1 hr)"
            ],
            project: "Custom domain chatbot",
            notes: ""
          },
          {
            day: 46,
            tasks: [
              "Retrieval Augmented Generation (RAG) (1 hr)",
              "Vector databases: Pinecone/Weaviate (1 hr)",
              "Build RAG system (1 hr)"
            ],
            project: "Document Q&A with RAG",
            notes: ""
          },
          {
            day: 47,
            tasks: [
              "LangChain framework basics (1 hr)",
              "Build chains and agents (1.5 hrs)",
              "Memory and conversation handling (30 min)"
            ],
            project: "LangChain-powered assistant",
            notes: ""
          },
          {
            day: 48,
            tasks: [
              "Embeddings and semantic search (1 hr)",
              "Build recommendation system (1.5 hrs)",
              "Evaluate recommendation quality (30 min)"
            ],
            project: "Content recommendation engine",
            notes: ""
          },
          {
            day: 49,
            tasks: [
              "Advanced LLM techniques (1 hr)",
              "Build comprehensive LLM project (1.5 hrs)",
              "Performance optimization (30 min)"
            ],
            project: "Advanced AI assistant application",
            notes: ""
          }
        ]
      },
      {
        week: 8,
        month: 2,
        title: "Reinforcement Learning & Specialized Topics",
        focus: "RL Fundamentals & Applications",
        days: [
          {
            day: 50,
            tasks: [
              "RL basics: agents, environments, rewards (1 hr)",
              "Q-Learning algorithm (1 hr)",
              "Implement simple RL agent (1 hr)"
            ],
            project: "Grid world navigator",
            notes: ""
          },
          {
            day: 51,
            tasks: [
              "Deep Q-Networks (DQN) (1 hr)",
              "Experience replay and target networks (1 hr)",
              "Build DQN for game (1 hr)"
            ],
            project: "Atari game-playing agent",
            notes: ""
          },
          {
            day: 52,
            tasks: [
              "Policy gradient methods (1 hr)",
              "Actor-Critic algorithms (1 hr)",
              "Advanced RL project (1 hr)"
            ],
            project: "Continuous control task",
            notes: ""
          },
          {
            day: 53,
            tasks: [
              "Time series forecasting basics (1 hr)",
              "LSTM for time series (1 hr)",
              "Build forecasting model (1 hr)"
            ],
            project: "Stock price predictor",
            notes: ""
          },
          {
            day: 54,
            tasks: [
              "Anomaly detection techniques (1 hr)",
              "Isolation forests, autoencoders (1 hr)",
              "Real-world anomaly detection (1 hr)"
            ],
            project: "Network intrusion detector",
            notes: ""
          },
          {
            day: 55,
            tasks: [
              "Recommender systems: collaborative filtering (1 hr)",
              "Matrix factorization (1 hr)",
              "Build recommendation engine (1 hr)"
            ],
            project: "Movie recommender system",
            notes: ""
          },
          {
            day: 56,
            tasks: [
              "Month 2 review (1 hr)",
              "Portfolio update with advanced projects (1.5 hrs)",
              "Month 3 planning (30 min)"
            ],
            project: "Month 2 comprehensive review",
            notes: ""
          }
        ]
      },
      // MONTH 3 - JOB READINESS
      {
        week: 9,
        month: 3,
        title: "Real-World Projects Week 1",
        focus: "Industry-Standard Complete Projects",
        days: [
          {
            day: 57,
            tasks: [
              "Plan e-commerce recommendation system (30 min)",
              "Data collection and preprocessing (1.5 hrs)",
              "Initial model development (1 hr)"
            ],
            project: "E-commerce Recommendation Engine",
            notes: ""
          },
          {
            day: 58,
            tasks: [
              "Implement collaborative filtering (1 hr)",
              "Content-based filtering (1 hr)",
              "Hybrid approach (1 hr)"
            ],
            project: "E-commerce Recommendation Engine (cont.)",
            notes: ""
          },
          {
            day: 59,
            tasks: [
              "Build API for recommendations (1.5 hrs)",
              "Frontend integration basics (1 hr)",
              "Testing and optimization (30 min)"
            ],
            project: "E-commerce Recommendation Engine (final)",
            notes: ""
          },
          {
            day: 60,
            tasks: [
              "Plan medical diagnosis assistant (30 min)",
              "Medical dataset preparation (1.5 hrs)",
              "CNN model development (1 hr)"
            ],
            project: "Medical Image Diagnosis System",
            notes: ""
          },
          {
            day: 61,
            tasks: [
              "Transfer learning implementation (1 hr)",
              "Model evaluation and validation (1 hr)",
              "Explainability with Grad-CAM (1 hr)"
            ],
            project: "Medical Image Diagnosis System (cont.)",
            notes: ""
          },
          {
            day: 62,
            tasks: [
              "Build web interface (1.5 hrs)",
              "Deployment preparation (1 hr)",
              "Documentation (30 min)"
            ],
            project: "Medical Image Diagnosis System (final)",
            notes: ""
          },
          {
            day: 63,
            tasks: [
              "Week review and portfolio update (1.5 hrs)",
              "LinkedIn project showcase creation (1 hr)",
              "Rest and reflection (30 min)"
            ],
            project: "Portfolio enhancement",
            notes: ""
          }
        ]
      },
      {
        week: 10,
        month: 3,
        title: "Real-World Projects Week 2",
        focus: "Advanced Applications",
        days: [
          {
            day: 64,
            tasks: [
              "Plan fraud detection system (30 min)",
              "Financial dataset preparation (1.5 hrs)",
              "Exploratory data analysis (1 hr)"
            ],
            project: "Real-time Fraud Detection System",
            notes: ""
          },
          {
            day: 65,
            tasks: [
              "Feature engineering for fraud (1 hr)",
              "Imbalanced data handling (1 hr)",
              "Model training and comparison (1 hr)"
            ],
            project: "Real-time Fraud Detection System (cont.)",
            notes: ""
          },
          {
            day: 66,
            tasks: [
              "Real-time prediction pipeline (1.5 hrs)",
              "Alert system implementation (1 hr)",
              "Dashboard creation (30 min)"
            ],
            project: "Real-time Fraud Detection System (final)",
            notes: ""
          },
          {
            day: 67,
            tasks: [
              "Plan intelligent chatbot (30 min)",
              "Training data preparation (1 hr)",
              "RAG system setup (1.5 hrs)"
            ],
            project: "Enterprise Customer Support Chatbot",
            notes: ""
          },
          {
            day: 68,
            tasks: [
              "Fine-tune LLM for domain (1.5 hrs)",
              "Intent classification (1 hr)",
              "Conversation flow design (30 min)"
            ],
            project: "Enterprise Customer Support Chatbot (cont.)",
            notes: ""
          },
          {
            day: 69,
            tasks: [
              "Multi-turn conversation handling (1 hr)",
              "Integration with ticketing system (1 hr)",
              "Testing and refinement (1 hr)"
            ],
            project: "Enterprise Customer Support Chatbot (final)",
            notes: ""
          },
          {
            day: 70,
            tasks: [
              "Week review (1 hr)",
              "GitHub portfolio polish (1.5 hrs)",
              "Project documentation enhancement (30 min)"
            ],
            project: "Portfolio refinement",
            notes: ""
          }
        ]
      },
      {
        week: 11,
        month: 3,
        title: "Interview Preparation Week 1",
        focus: "Technical Interview Skills",
        days: [
          {
            day: 71,
            tasks: [
              "ML theory review: supervised learning (1 hr)",
              "Practice coding ML from scratch (1.5 hrs)",
              "LeetCode-style ML problems (30 min)"
            ],
            project: "Interview prep - Algorithms",
            notes: ""
          },
          {
            day: 72,
            tasks: [
              "Deep learning concepts review (1 hr)",
              "Explain architectures on whiteboard (1 hr)",
              "Common DL interview questions (1 hr)"
            ],
            project: "Interview prep - Deep Learning",
            notes: ""
          },
          {
            day: 73,
            tasks: [
              "NLP concepts and applications (1 hr)",
              "LLM architecture explanations (1 hr)",
              "Practice NLP case studies (1 hr)"
            ],
            project: "Interview prep - NLP",
            notes: ""
          },
          {
            day: 74,
            tasks: [
              "MLOps and deployment questions (1 hr)",
              "System design for ML systems (1.5 hrs)",
              "Scalability discussions (30 min)"
            ],
            project: "Interview prep - MLOps",
            notes: ""
          },
          {
            day: 75,
            tasks: [
              "Statistics and probability review (1 hr)",
              "A/B testing and experimentation (1 hr)",
              "Metrics and evaluation (1 hr)"
            ],
            project: "Interview prep - Statistics",
            notes: ""
          },
          {
            day: 76,
            tasks: [
              "Mock interview practice (1.5 hrs)",
              "Behavioral questions preparation (1 hr)",
              "Project presentation practice (30 min)"
            ],
            project: "Interview prep - Mock interviews",
            notes: ""
          },
          {
            day: 77,
            tasks: [
              "Create ML case study portfolio (2 hrs)",
              "Prepare technical presentation (1 hr)"
            ],
            project: "Case study preparation",
            notes: ""
          }
        ]
      },
      {
        week: 12,
        month: 3,
        title: "Job Application & Final Projects",
        focus: "Job Readiness & Application",
        days: [
          {
            day: 78,
            tasks: [
              "Resume optimization for AI/ML roles (1.5 hrs)",
              "LinkedIn profile enhancement (1 hr)",
              "Portfolio website final touches (30 min)"
            ],
            project: "Personal branding",
            notes: ""
          },
          {
            day: 79,
            tasks: [
              "Research target companies (1 hr)",
              "Customize applications (1.5 hrs)",
              "Network on LinkedIn (30 min)"
            ],
            project: "Job applications",
            notes: ""
          },
          {
            day: 80,
            tasks: [
              "Start capstone project planning (1 hr)",
              "Combine multiple ML techniques (1.5 hrs)",
              "Initial development (30 min)"
            ],
            project: "Capstone: End-to-end ML System",
            notes: ""
          },
          {
            day: 81,
            tasks: [
              "Capstone development continuation (2 hrs)",
              "Integration of components (1 hr)"
            ],
            project: "Capstone: End-to-end ML System",
            notes: ""
          },
          {
            day: 82,
            tasks: [
              "Capstone testing and refinement (1.5 hrs)",
              "Performance optimization (1 hr)",
              "Documentation (30 min)"
            ],
            project: "Capstone: End-to-end ML System",
            notes: ""
          },
          {
            day: 83,
            tasks: [
              "Capstone deployment (1.5 hrs)",
              "Create demo video (1 hr)",
              "Final presentation prep (30 min)"
            ],
            project: "Capstone: End-to-end ML System",
            notes: ""
          },
          {
            day: 84,
            tasks: [
              "Portfolio final review (1 hr)",
              "GitHub profile optimization (1 hr)",
              "Contribution to open source ML project (1 hr)"
            ],
            project: "Final portfolio polish",
            notes: ""
          }
        ]
      },
      {
        week: 13,
        month: 3,
        title: "Continued Learning & Specialization",
        focus: "Advanced Topics & Job Search",
        days: [
          {
            day: 85,
            tasks: [
              "Apply to 5 AI/ML positions (1.5 hrs)",
              "Advanced topic: Diffusion models (1 hr)",
              "Practice interview questions (30 min)"
            ],
            project: "Active job search",
            notes: ""
          },
          {
            day: 86,
            tasks: [
              "Advanced topic: Graph Neural Networks (1.5 hrs)",
              "Small GNN project (1 hr)",
              "Interview prep (30 min)"
            ],
            project: "GNN exploration",
            notes: ""
          },
          {
            day: 87,
            tasks: [
              "Advanced topic: Multi-modal learning (1.5 hrs)",
              "Image-text model experiment (1 hr)",
              "Portfolio update (30 min)"
            ],
            project: "Multi-modal project",
            notes: ""
          },
          {
            day: 88,
            tasks: [
              "Contribute to Kaggle competition (2 hrs)",
              "Network with ML community (1 hr)"
            ],
            project: "Kaggle participation",
            notes: ""
          },
          {
            day: 89,
            tasks: [
              "Write technical blog post (1.5 hrs)",
              "Share on LinkedIn/Medium (30 min)",
              "Interview preparation (1 hr)"
            ],
            project: "Technical writing",
            notes: ""
          },
          {
            day: 90,
            tasks: [
              "Final review of 90-day journey (1 hr)",
              "Plan next 90 days (1 hr)",
              "Celebration and reflection (1 hr)"
            ],
            project: "Journey completion & next steps",
            notes: ""
          }
        ]
      }
    ],
    resources: {
      essential: [
        "Python for Data Science: NumPy, Pandas, Matplotlib",
        "Scikit-learn Documentation",
        "TensorFlow/Keras Documentation",
        "PyTorch Tutorials",
        "Hugging Face Transformers",
        "Fast.ai Practical Deep Learning Course",
        "Andrew Ng's Machine Learning Course",
        "Deep Learning Specialization (Coursera)"
      ],
      tools: [
        "Python 3.8+",
        "Jupyter Notebook/Google Colab",
        "VS Code with Python extensions",
        "Git & GitHub",
        "TensorFlow/Keras",
        "PyTorch",
        "Scikit-learn",
        "Hugging Face",
        "Docker",
        "AWS/GCP (free tier)"
      ],
      datasets: [
        "Kaggle Datasets",
        "UCI ML Repository",
        "Hugging Face Datasets",
        "Google Dataset Search",
        "Papers with Code Datasets"
      ]
    },
    portfolioProjects: [
      "House Price Predictor (Regression)",
      "Customer Churn Prediction (Classification)",
      "Image Classification with CNN",
      "Sentiment Analysis System",
      "Object Detection Application",
      "Chatbot with RAG",
      "Recommendation Engine",
      "Fraud Detection System",
      "Medical Image Diagnosis",
      "Capstone: End-to-End ML System"
    ]
  };

  const generatePDF = () => {
    window.print();
  };

  const weekNavButtons = roadmapData.weeks.map((week) => {
    const isActive = activeWeek === week.week;
    const baseClasses = 'px-4 py-2 rounded-lg font-semibold transition-colors whitespace-nowrap';
    const stateClasses = isActive
      ? 'bg-blue-600 text-white'
      : 'bg-white text-gray-700 hover:bg-gray-100';

    const classes = [baseClasses, stateClasses].join(' ');

    return (
      <button
        key={week.week}
        onClick={() => setActiveWeek(week.week)}
        className={classes}
      >
        Week {week.week}
      </button>
    );
  });

  const weekContent = roadmapData.weeks.map((week) => (
    activeWeek === week.week && (
      <div key={week.week} className="p-8">
        {/* Week Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-bold">
              Month {week.month}
            </div>
            <div className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full font-bold">
              Week {week.week}
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">{week.title}</h2>
          <p className="text-xl text-gray-600">Focus: {week.focus}</p>
        </div>

        {/* Days */}
        <div className="space-y-6">
          {week.days.map((day) => (
            <div key={day.day} className="border-2 border-gray-200 rounded-xl p-6 hover:border-blue-300 transition-colors bg-white">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg">
                  {day.day}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800">Day {day.day}</h3>
                </div>
              </div>

              {/* Tasks */}
              <div className="mb-4">
                <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <CheckSquare size={18} className="text-blue-600" />
                  Tasks:
                </h4>
                <div className="space-y-2 ml-6">
                  {day.tasks.map((task, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="mt-1 w-5 h-5 border-2 border-gray-400 rounded flex-shrink-0"></div>
                      <p className="text-gray-700">{task}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Project */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 mb-4">
                <h4 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                  <Code size={18} />
                  Project:
                </h4>
                <p className="text-green-900 font-medium">{day.project}</p>
              </div>

              {/* Notes Section */}
              <div className="bg-yellow-50 rounded-lg p-4 border-2 border-yellow-200">
                <h4 className="font-semibold text-yellow-800 mb-2 flex items-center gap-2">
                  <BookOpen size={18} />
                  Today's Learning Notes:
                </h4>
                <div className="h-24 bg-white rounded border-2 border-dashed border-yellow-300 p-2">
                  <p className="text-gray-400 text-sm italic">Write your notes here...</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  ));

  const printView = (
    <div id="print-roadmap" className="p-8 bg-white text-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold">AI Development Roadmap</h1>
        </div>

        {roadmapData.weeks.map((week) => (
          <div key={week.week} className="mb-10 print-page-break">
            <div className="flex items-center gap-3 mb-2">
              <div className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-semibold">
                Month {week.month}
              </div>
              <div className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full font-semibold">
                Week {week.week}
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">{week.title}</h2>
            <p className="text-lg text-gray-600 mb-4">Focus: {week.focus}</p>

            <div className="space-y-4">
              {week.days.map((day) => (
                <div key={day.day} className="border border-gray-200 rounded-lg p-4 break-inside-avoid">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white flex items-center justify-center font-bold">
                      {day.day}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800">Day {day.day}</h3>
                  </div>
                  <div className="mb-3">
                    <p className="font-semibold text-gray-700 mb-1">Tasks</p>
                    <ul className="space-y-1 text-gray-700">
                      {day.tasks.map((task, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="mt-0.5 w-4 h-4 border-2 border-gray-400 rounded-sm inline-block"></span>
                          <span>{task}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-green-50 border border-green-100 rounded-lg p-3">
                    <p className="font-semibold text-green-800 mb-1">Project</p>
                    <p className="text-green-900">{day.project}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="mt-10">
          <h3 className="text-2xl font-bold text-purple-900 mb-4">Essential Resources</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold text-purple-800 mb-2">Learning Resources</h4>
              <ul className="space-y-1 text-gray-700">
                {roadmapData.resources.essential.map((resource, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="mt-0.5 w-4 h-4 border-2 border-gray-400 rounded-sm inline-block"></span>
                    <span>{resource}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-purple-800 mb-2">Tools & Technologies</h4>
              <ul className="space-y-1 text-gray-700">
                {roadmapData.resources.tools.map((tool, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="mt-0.5 w-4 h-4 border-2 border-gray-400 rounded-sm inline-block"></span>
                    <span>{tool}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-purple-800 mb-2">Dataset Sources</h4>
              <ul className="space-y-1 text-gray-700">
                {roadmapData.resources.datasets.map((dataset, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="mt-0.5 w-4 h-4 border-2 border-gray-400 rounded-sm inline-block"></span>
                    <span>{dataset}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <h3 className="text-2xl font-bold text-blue-900 mb-3">Portfolio Projects</h3>
          <ul className="space-y-1 text-gray-800">
            {roadmapData.portfolioProjects.map((project, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="mt-0.5 w-4 h-4 border-2 border-gray-400 rounded-sm inline-block"></span>
                <span>{project}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );

  return (
    <>
    <div id="interactive-roadmap" className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold mb-2">{roadmapData.overview.title}</h1>
              <p className="text-xl opacity-90">{roadmapData.overview.goal}</p>
            </div>
            <button
              onClick={generatePDF}
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-blue-50 transition-colors"
            >
              <Download size={20} />
              Download PDF
            </button>
          </div>
          
          <div className="mt-6 grid grid-cols-3 gap-4">
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Calendar size={20} />
                <span className="font-semibold">Duration</span>
              </div>
              <p className="text-2xl font-bold">{roadmapData.overview.duration}</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Target size={20} />
                <span className="font-semibold">Daily Commitment</span>
              </div>
              <p className="text-2xl font-bold">{roadmapData.overview.commitment}</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Briefcase size={20} />
                <span className="font-semibold">Outcome</span>
              </div>
              <p className="text-lg font-bold">Job Ready!</p>
            </div>
          </div>
        </div>

        {/* Week Navigation */}
        <div className="bg-gray-50 p-4 border-b overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            {weekNavButtons}
          </div>
        </div>

        {/* Week Content */}
        {weekContent}

        {/* Resources Section */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-8 border-t-4 border-purple-300">
          <h2 className="text-2xl font-bold text-purple-900 mb-6">📚 Essential Resources</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-bold text-purple-800 mb-3">Learning Resources</h3>
              <ul className="space-y-2">
                {roadmapData.resources.essential.map((resource, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-purple-600 mt-1">•</span>
                    <span className="text-gray-700">{resource}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-purple-800 mb-3">Tools & Technologies</h3>
              <ul className="space-y-2">
                {roadmapData.resources.tools.map((tool, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-purple-600 mt-1">•</span>
                    <span className="text-gray-700">{tool}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-purple-800 mb-3">Dataset Sources</h3>
              <ul className="space-y-2">
                {roadmapData.resources.datasets.map((dataset, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-purple-600 mt-1">•</span>
                    <span className="text-gray-700">{dataset}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Portfolio Projects Summary */}
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-8 border-t-4 border-blue-300">
          <h2 className="text-2xl font-bold text-blue-900 mb-6">🎯 Portfolio Projects</h2>
          <div className="grid md:grid-cols-2 gap-3">
            {roadmapData.portfolioProjects.map((project, idx) => (
              <div key={idx} className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-blue-500">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 border-2 border-blue-500 rounded flex-shrink-0 mt-1"></div>
                  <span className="text-gray-800 font-medium">{project}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-800 text-white p-6 text-center">
          <p className="text-lg font-semibold mb-2">🚀 Your AI/ML Journey Starts Now!</p>
          <p className="text-gray-300">Stay consistent, build projects, and you'll be job-ready in 90 days.</p>
          <p className="text-sm text-gray-400 mt-4">Print this roadmap and check off each day as you progress!</p>
        </div>
      </div>
    </div>
    {printView}
    <style jsx global>{`
      #print-roadmap {
        display: none;
      }
      @media print {
        @page {
          margin: 0;
        }
        body {
          background: white;
        }
        #interactive-roadmap {
          display: none !important;
        }
        #print-roadmap {
          display: block !important;
        }
        .print-page-break {
          page-break-after: always;
        }
        .break-inside-avoid {
          break-inside: avoid;
          page-break-inside: avoid;
        }
      }
    `}</style>
    </>
  );
};

export default RoadmapPDF;