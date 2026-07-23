let pdfParse = require("pdf-parse");

// Compatibility fix: Resolve pdf-parse across version variations
if (typeof pdfParse !== "function") {
    if (pdfParse.default) {
        pdfParse = pdfParse.default;
    } else if (pdfParse.PDFParse) {
        const { PDFParse } = pdfParse;
        pdfParse = async (buffer) => {
            const parser = new PDFParse({ data: buffer });
            const result = await parser.getText();
            return { text: typeof result === "string" ? result : result.text };
        };
    } else {
        pdfParse = require("pdf-parse/lib/pdf-parse.js");
    }
}

const { generateInterviewReport } = require("../services/ai.service");
const interviewReportModel = require("../models/interviewReport.model");

async function generateInterviewReportController(req, res) {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "Resume file is required" });
        }

        // Parse PDF text safely
        const parsedPdf = await pdfParse(req.file.buffer);
        const resumeContent = parsedPdf.text;

        const { selfDescription, jobDescription } = req.body;

        const interViewReportByAi = await generateInterviewReport({
            resume: resumeContent,
            selfDescription,
            jobDescription,
        });

        // ✅ FIXED: Explicitly mapping Gemini keys to Mongoose Schema keys
        const interviewReport = await interviewReportModel.create({
            user: req.user?.id || req.user?._id,
            resume: resumeContent,
            selfDescription,
            jobDescription,
            title: interViewReportByAi.title || "Interview Report",
            matchScore: interViewReportByAi.matchScore,
            
            // Map Gemini's generated fields to your MongoDB schema keys:
            technicalQuestion: interViewReportByAi.technicalQuestions || [],
            behaviouralQuestionSchema: interViewReportByAi.behavioralQuestions || [],
            skillGapSchema: interViewReportByAi.skillGaps || [],
            preparationPlanSchema: interViewReportByAi.preparationPlan || []
        });

        return res.status(201).json({
            message: "Interview Report Generated Successfully",
            interviewReport,
        });
    } catch (error) {
        console.error("Error generating interview report:", error);
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
}

async function getInterviewReportByIdController(req, res) {

    const { interviewId } = req.params

    const interviewReport = await interviewReportModel.findOne({ _id: interviewId, user: req.user.id })

    if (!interviewReport) {
        return res.status(404).json({
            message: "Interview report not found."
        })
    }

    res.status(200).json({
        message: "Interview report fetched successfully.",
        interviewReport
    })
}

async function getAllInterviewReportsController(req, res) {
    const interviewReports = await interviewReportModel.find({ user: req.user.id }).sort({ createdAt: -1 }).select("-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan")

    res.status(200).json({
        message: "Interview reports fetched successfully.",
        interviewReports
    })
}

module.exports = { generateInterviewReportController, getInterviewReportByIdController, getAllInterviewReportsController};