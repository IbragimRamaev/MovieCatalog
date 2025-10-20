using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Services;

namespace MovieCatalog.server.Services
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddAppServices(this IServiceCollection services, IConfiguration config)
        {
            // Register EF Core DbContext
            services.AddDbContext<AppDbContext>(options =>
                options.UseSqlServer(config.GetConnectionString("DefaultConnection")));

            // Register Movie API Service
            services.AddHttpClient<MovieApiService>();

            services.AddScoped<FavoriteService>();


            return services;
        }
    }
}
