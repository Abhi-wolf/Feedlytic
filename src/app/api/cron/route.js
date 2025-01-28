import {
  generateMonthlyReport,
  getAllWebsites,
} from "@/lib/queries/reportQueries";
import sendEmail from "@/lib/emailService";

export async function GET() {
  try {
    const data = await getAllWebsites();

    data?.forEach((web) => {
      const fetchReportData = async () => {
        const now = new Date();
        const res = await generateMonthlyReport(
          now.getMonth(),
          now.getFullYear(),
          web.domain
        );

        await emailTemplate(web.email, res);
      };

      fetchReportData();
    });
    return Response.json({ datetime: "hello" });
  } catch (err) {
    console.log("GET ALL WEBSITES QUERY =", err);
  }
}

const emailTemplate = async (email, res) => {
  try {
    const emailBody = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Website Analytics Report</title>
    <style>
        /* Reset styles for email clients */
        body, p, h1, h2, h3, h4, h5, h6, table, td, th {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
            font-size: 14px;
            line-height: 1.4;
        }
        body {
            background-color: #f4f4f4;
            color: #333;
            padding: 20px;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }
        .header {
            background-color: #4a148c;
            color: #ffffff;
            padding: 20px;
            text-align: center;
        }
        .header h1 {
            font-size: 24px;
            margin-bottom: 5px;
            color:#2e7d32;
        }
        .header h2 {
            font-size: 18px;
            font-weight: normal;
            margin-bottom: 5px;
        }
        .header h3 {
            font-size: 12px;
            margin-bottom: 10px;
        }
        .header p {
            font-size: 14px;
            opacity: 0.8;
        }
        .content {
            padding: 20px;
        }
        .metrics {
            display: table;
            width: 100%;
            margin-bottom: 20px;
            border-collapse: separate;
            border-spacing: 10px;
        }
        .metric-row {
            display: table-row;
        }
        
        span {
            text-decoration: underline;
            color:#1565c0;
            cursor: pointer;
        }
        .metric-box {
            display: table-cell;
            width: 50%;
            padding: 15px;
            border-radius: 8px;
            text-align: center;
        }
        .metric-box p {
            margin: 0;
            font-size: 14px;
        }
        .metric-value {
            font-size: 24px;
            font-weight: bold;
            margin-top: 5px;
        }
        .blue { background-color: #e3f2fd; color: #1565c0; }
        .green { background-color: #e8f5e9; color: #2e7d32; }
        .yellow { background-color: #fff8e1; color: #f9a825; }
        .purple { background-color: #f3e5f5; color: #6a1b9a; }
        .section-title {
            font-size: 20px;
            color: #2c3e50;
            text-align: center;
            margin: 20px 0;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }
        th, td {
            border: 1px solid #ddd;
            padding: 12px;
            text-align: left;
        }
        th {
            background-color: #f2f2f2;
            font-weight: bold;
        }
        tr:nth-child(even) {
            background-color: #f9f9f9;
        }
        .footer {
            background-color: #f4f4f4;
            text-align: center;
            padding: 20px;
            font-size: 12px;
            color: #666;
        }
        @media only screen and (max-width: 600px) {
            .metric-row {
                display: block;
            }
            .metric-box {
                display: block;
                width: auto;
                margin-bottom: 10px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
              <h1>Feedlytic</h1>
            <h2>Analytics Report of <span>${res.domain}</span></h2>
            <p>Performance Summary for ${
              res.date
            } – Detailed Insights for Your Website</p>
        </div>
        <div class="content">
            <div class="metrics">
                <div class="metric-row">
                    <div class="metric-box blue">
                        <p>Total Visits</p>
                        <p class="metric-value">${res.totalVisits}</p>
                    </div>
                    <div class="metric-box green">
                        <p>Total Page Views</p>
                        <p class="metric-value">${res.totalPageViews}</p>
                    </div>
                </div>
                <div class="metric-row">
                    <div class="metric-box yellow">
                        <p>Total Events</p>
                        <p class="metric-value">${res.totalEvents}</p>
                    </div>
                    <div class="metric-box purple">
                        <p>Total Feedbacks</p>
                        <p class="metric-value">${res.totalFeedbacks}</p>
                    </div>
                </div>
            </div>

            <h2 class="section-title">Top Page Views</h2>
            <table>
                <thead>
                    <tr>
                        <th>Page</th>
                        <th>Visits</th>
                    </tr>
                </thead>
                <tbody>
                    ${res.topPageViews
                      ?.map(
                        (view) => `
                    <tr>
                        <td>${view.page}</td>
                        <td>${view.visits}</td>
                    </tr>
                    `
                      )
                      .join("")}
                </tbody>
            </table>
        </div>
        <div class="footer">
            <p>This report was generated automatically. If you have any questions, please contact </p> <span>krabhisingh008@gmail.com</span>
        </div>
    </div>
</body>
</html>`;
    const subject = `Your Monthly Analytics Report for ${res.domain} – ${res.date}`;
    await sendEmail({ to: email, subject, text: emailBody });
  } catch (err) {
    console.log("EMAIL SENDING ERROR = ", err);
  }
};
