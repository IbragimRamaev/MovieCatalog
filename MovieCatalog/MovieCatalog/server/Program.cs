using MovieCatalog.server.Services.Extensions;  // Imports our extension for services (we’ll create it soon)
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Registers all controllers
builder.Services.AddControllers();

// Add Swagger for Api documantation and testing
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "MoviCatalog",
        Version = "v1",
        Description = "Backend API for MovieCatalog project"
    });
});

//Enables CORS so React frontend can call our API
builder.Services.AddCors(option =>
{
    option.AddPolicy("AllowReactApp",
        policy => policy.WithOrigins("http://localhost:3000")
        .AllowAnyHeader()
        .AllowAnyMethod());
});


var app = builder.Build();

// Enables Swagger only in Development mode
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Middleware pipeline (HTTP request handling order)
app.UseHttpsRedirection();   // Redirects all HTTP → HTTPS
app.UseCors("AllowReactApp"); // Enables CORS for React frontend
app.UseAuthorization();       // Authorization middleware (we’ll use later)
app.MapControllers();         // Maps API endpoints to controllers
app.Run();                    // Starts the application