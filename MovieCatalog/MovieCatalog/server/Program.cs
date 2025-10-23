using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using server.Services;
using server.Data;



var builder = WebApplication.CreateBuilder(args);

//Add controllers (they handle API routes)
builder.Services.AddHttpClient();
builder.Services.AddScoped<MovieApiService>();
builder.Services.AddScoped<FavoriteService>();
builder.Services.AddControllers();


// Add Swagger for documentation and testing
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

//Configure CORS (Cross-Origin Resource Sharing) for React app
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
        policy.WithOrigins("http://localhost:3000") // React runs here
              .AllowAnyHeader()
              .AllowAnyMethod());
});

// Register services and database
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

var app = builder.Build();

//Enable Swagger only in Development mode
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI();
}

//HTTP request pipeline configuration
app.UseHttpsRedirection();
app.UseCors("AllowReactApp");
app.UseAuthorization();
app.MapControllers();

//Start the server
app.Run();
