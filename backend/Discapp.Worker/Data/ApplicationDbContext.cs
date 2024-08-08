using Microsoft.EntityFrameworkCore;

namespace Discapp.Worker.Data
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<Queue> Queue { get; set; }
        public DbSet<Record> Records { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }
    }
}
