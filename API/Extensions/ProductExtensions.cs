using System.Linq;
using API.Entities;

namespace API.Extensions
{
    public static class ProductExtensions
    {
        public static IQueryable<Product> Sort(this IQueryable<Product> query, string orderBy)
        {
            switch (orderBy)
            {
                case "price":
                    return query.OrderBy(p => p.Price);
                case "priceDesc":
                    return query.OrderByDescending(p => p.Price);
                default:
                    return query.OrderBy(p => p.Name);
            }
        

        }

        public static IQueryable<Product> Search(this IQueryable<Product> query, string search)
        {
            if (search != null)
            {
                return query.Where(p => p.Name.ToLower().Contains(search.Trim().ToLower()));
            }
            return query;
        }
    }
}