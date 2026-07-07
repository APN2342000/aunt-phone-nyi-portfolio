using Microsoft.AspNetCore.Mvc;
using Portfolio.Api.Models;

namespace Portfolio.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ContactController : ControllerBase
{
    private readonly ILogger<ContactController> _logger;

    public ContactController(ILogger<ContactController> logger)
    {
        _logger = logger;
    }

    // POST api/contact
    // Minimal stub: logs the message server-side. Swap in an email provider
    // (e.g. SendGrid, SMTP) or persist to MySQL when you're ready to go live.
    [HttpPost]
    public IActionResult Submit([FromBody] ContactMessage message)
    {
        if (string.IsNullOrWhiteSpace(message.Name) ||
            string.IsNullOrWhiteSpace(message.Email) ||
            string.IsNullOrWhiteSpace(message.Message))
        {
            return BadRequest(new { error = "Name, email, and message are all required." });
        }

        _logger.LogInformation(
            "New portfolio contact message from {Name} <{Email}>: {Message}",
            message.Name, message.Email, message.Message);

        return Ok(new { success = true, receivedAt = DateTimeOffset.UtcNow });
    }
}
