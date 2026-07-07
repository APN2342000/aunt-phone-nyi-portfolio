namespace Portfolio.Api.Models;

public record Profile(
    string Name,
    string Title,
    string Tagline,
    string About,
    string Email,
    string Phone,
    string Location,
    string LinkedIn,
    bool OpenToWork
);

public record SkillGroup(
    string PartNumber,   // silkscreen-style label, e.g. "U1"
    string Category,
    List<string> Items
);

public record ExperienceItem(
    string Company,
    string Role,
    string EmploymentType,
    string Period,
    string Duration,
    string Location,
    List<string> Highlights,
    bool IsCurrent
);

public record EducationItem(
    string Credential,
    string Institution,
    string Period
);

public record ProjectItem(
    string Name,
    string Subtitle,
    string Description,
    List<string> Stack
);

public record Strength(string Label);

public record LanguageSkill(string Name, string Level);

public record ContactMessage(
    string Name,
    string Email,
    string Message
);
