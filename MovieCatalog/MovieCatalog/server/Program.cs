using Microsoft.OpenApi.Models;
using MovieCatalog.server.Services;


var builder = WebApplication.CreateBuilder(args);

// 1️⃣ Add controllers (they handle API routes)
builder.Services.AddControllers();

// 2️⃣ Add Swagger for documentation and testing
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "MovieCatalog API",
        Version = "v1",
        Description = "Backend API for the MovieCatalog project"
    });
});

// 3️⃣ Configure CORS (Cross-Origin Resource Sharing) for React app
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
        policy.WithOrigins("http://localhost:3000") // React runs here
              .AllowAnyHeader()
              .AllowAnyMethod());
});

// 4️⃣ Register services and database (we created this in ServiceCollectionExtensions)
builder.Services.AddAppServices(builder.Configuration);

var app = builder.Build();

// 5️⃣ Enable Swagger only in Development mode
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// 6️⃣ HTTP request pipeline configuration
app.UseHttpsRedirection();   // redirects HTTP → HTTPS
app.UseCors("AllowReactApp"); // enables CORS policy
app.UseAuthorization();       // placeholder for auth logic (later)
app.MapControllers();         // maps routes to controllers

// 7️⃣ Start the server
app.Run();
