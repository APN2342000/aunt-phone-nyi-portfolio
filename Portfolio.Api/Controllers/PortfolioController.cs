using Microsoft.AspNetCore.Mvc;
using Portfolio.Api.Data;
using Portfolio.Api.Models;

namespace Portfolio.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PortfolioController : ControllerBase
{
    // GET api/portfolio
    // Returns everything in one payload — simplest option for a single-page portfolio.
    [HttpGet]
    public ActionResult<object> GetAll()
    {
        return Ok(new
        {
            profile = PortfolioData.Profile,
            skills = PortfolioData.Skills,
            experience = PortfolioData.Experience,
            education = PortfolioData.Education,
            projects = PortfolioData.Projects,
            strengths = PortfolioData.Strengths,
            languages = PortfolioData.Languages
        });
    }

    [HttpGet("profile")]
    public ActionResult<Profile> GetProfile() => Ok(PortfolioData.Profile);

    [HttpGet("skills")]
    public ActionResult<List<SkillGroup>> GetSkills() => Ok(PortfolioData.Skills);

    [HttpGet("experience")]
    public ActionResult<List<ExperienceItem>> GetExperience() => Ok(PortfolioData.Experience);

    [HttpGet("education")]
    public ActionResult<List<EducationItem>> GetEducation() => Ok(PortfolioData.Education);

    [HttpGet("projects")]
    public ActionResult<List<ProjectItem>> GetProjects() => Ok(PortfolioData.Projects);

    [HttpGet("strengths")]
    public ActionResult<List<Strength>> GetStrengths() => Ok(PortfolioData.Strengths);

    [HttpGet("languages")]
    public ActionResult<List<LanguageSkill>> GetLanguages() => Ok(PortfolioData.Languages);
}
