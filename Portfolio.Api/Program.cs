var builder = WebApplication.CreateBuilder(args);

const string CorsPolicy = "PortfolioCors";

// Free hosts like Render, Railway, and Fly.io assign a port at runtime via
// the PORT environment variable and expect the app to listen on it.
// Locally, launchSettings.json still controls the port (see Properties/launchSettings.json).
var port = Environment.GetEnvironmentVariable("PORT");
if (!string.IsNullOrWhiteSpace(port))
{
    builder.WebHost.UseUrls($"http://0.0.0.0:{port}");
}

// Allowed CORS origins come from configuration so you can add your deployed
// frontend's URL without changing code — set the "AllowedOrigins" env var
// (comma-separated) on your host, e.g. AllowedOrigins=https://your-site.pages.dev
var configuredOrigins = builder.Configuration["AllowedOrigins"]
    ?.Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);

var allowedOrigins = (configuredOrigins is { Length: > 0 })
    ? configuredOrigins
    : ["http://localhost:4200", "https://localhost:4200"];

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy(CorsPolicy, policy =>
    {
        policy
            .WithOrigins(allowedOrigins)
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var app = builder.Build();

// Swagger is handy in production too when your API is the whole "product" —
// there's no sensitive data being exposed here, just endpoint shapes.
app.UseSwagger();
app.UseSwaggerUI();

// Skip HTTPS redirection when running behind a host (Render, etc.) that
// already terminates TLS in front of the container — avoids redirect loops.
if (app.Environment.IsDevelopment())
{
    app.UseHttpsRedirection();
}

app.UseCors(CorsPolicy);
app.UseAuthorization();
app.MapControllers();

app.Run();
