using Portfolio.Api.Models;

namespace Portfolio.Api.Data;

/// <summary>
/// Static seed data sourced from Aunt Phone Nyi's resume.
/// Swap this out for a database-backed repository if the portfolio grows
/// (e.g. an EF Core DbContext against MySQL, matching the stack on the resume).
/// </summary>
public static class PortfolioData
{
    public static Profile Profile => new(
        Name: "Aunt Phone Nyi",
        Title: "Web Developer",
        Tagline: "Angular · .NET · MySQL",
        About: "MIIT graduate in Electronics & Communications Engineering with over two years " +
               "of experience in web development, including a three-month internship. Passionate " +
               "about web development and data analytics, currently working as a developer and " +
               "continuously expanding skills in full-stack development and data-driven applications " +
               "while exploring new technologies and challenges.",
        Email: "auntphonenyi23@gmail.com",
        Phone: "+959964665258",
        Location: "Mahar Aung Myay Township, Mandalay, Myanmar",
        LinkedIn: "https://www.linkedin.com/in/aunt-phone-nyi-9685b5296",
        OpenToWork: true
    );

    public static List<SkillGroup> Skills =>
    [
        new("U1", "Markup & Styling", ["HTML", "CSS"]),
        new("U2", "Languages & Frameworks", ["C#", ".NET", "TypeScript", "JavaScript", "Angular"]),
        new("U3", "Data", ["MySQL", "R"]),
    ];

    public static List<ExperienceItem> Experience =>
    [
        new(
            Company: "Kumo Solutions Mandalay",
            Role: "Junior Web Developer",
            EmploymentType: "Full-time · On-site",
            Period: "Mar 2024 - Present",
            Duration: "2 yrs 5 mos",
            Location: "Mandalay, Myanmar",
            Highlights:
            [
                "Developed and maintained a CRM system (BrennanIT Procurement Automation) to automate IT product sales and subscription management, improving operational efficiency.",
                "Implemented tracking and reporting features to support data-driven decision-making and improve sales visibility.",
                "Performed system maintenance, debugging, and troubleshooting to ensure system stability and reliability.",
                "Refactored existing code to improve application performance, maintainability, and overall system efficiency."
            ],
            IsCurrent: true
        ),
        new(
            Company: "Kumo Solutions Mandalay",
            Role: "Junior Web Developer",
            EmploymentType: "Internship · On-site",
            Period: "Dec 2023 - Feb 2024",
            Duration: "3 mos",
            Location: "Mandalay District, Mandalay Region, Myanmar",
            Highlights:
            [
                "Onboarded onto the web development team, learning the C#/.NET and Angular stack in production.",
                "Contributed to early groundwork on the BrennanIT procurement platform ahead of converting to a full-time role."
            ],
            IsCurrent: false
        ),
    ];

    public static List<EducationItem> Education =>
    [
        new("B.E. (Hons.) in Electronics & Communications Engineering", "Myanmar Institute of Information Technology", ""),
        new("Diploma in English", "Mandalay University of Foreign Languages", ""),
    ];

    public static List<ProjectItem> Projects =>
    [
        new(
            Name: "Real-Time Vehicle Tracking System",
            Subtitle: "University capstone project",
            Description: "A live GPS tracking system built on GSM/GPRS hardware, reporting vehicle " +
                          "location in real time — the same systems-thinking now applied to full-stack web apps.",
            Stack: ["A9G GSM/GPRS+GPS Module", "NEO-6M GPS Module", "Arduino Uno"]
        ),
    ];

    public static List<Strength> Strengths =>
    [
        new("Positive attitude and optimism"),
        new("Multi-tasking"),
        new("Teamwork and collaborative skills"),
        new("Ability to learn quickly"),
        new("Empathy"),
        new("Problem solving"),
    ];

    public static List<LanguageSkill> Languages =>
    [
        new("English", "Intermediate"),
    ];
}
