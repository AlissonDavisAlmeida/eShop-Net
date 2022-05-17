using System;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{

    public class CartController : BaseApiController
    {
        private readonly StoreContext _context;

        public CartController(StoreContext context)
        {
            _context = context;
        }

        [HttpGet(Name ="GetCart")]
        public async Task<ActionResult<CartDTO>> GetCart()
        {
            Cart carts = await RetrieveCart();

            if (carts == null)
            {
                return NotFound();
            }

            return MapCart(carts);
        }

        

        [HttpPost]
        public async Task<ActionResult<CartDTO>> AddItemToCart(int productID, int quantity)
        {
            var cart = await RetrieveCart();

            if (cart == null)
            {
                cart = CreateCart();
            }


            var product = await _context.Products.FindAsync(productID);
            if (product == null)
            {
                return NotFound();
            }

            cart.AddItem(product, quantity);

            var result = await _context.SaveChangesAsync() > 0;

            if (!result)
            {

                return BadRequest(new ProblemDetails { Title = "Problem saving item to Cart" });
            }

            return CreatedAtRoute("GetCart", MapCart(cart));

        }

         [HttpDelete]
         public async Task<ActionResult> RemoveCartItem(int productID, int quantity)
         {
             var cart = await RetrieveCart();
             if(cart == null){
                 return NotFound();
             }


            cart.removeItem(productID, quantity);

            var result = await _context.SaveChangesAsync() > 0;

            if(result){
                return Ok();
            }

            return BadRequest(new ProblemDetails{Title = "Problem remove item from cart"});
         }

        private async Task<Cart> RetrieveCart()
        {
            return await _context.Cart
                .Include(p => p.Items)
                .ThenInclude(p => p.Product)
                .FirstOrDefaultAsync(param => param.BuyerID == Request.Cookies["buyerID"]);
        }

        private Cart CreateCart()
        {
            var buyerID = Guid.NewGuid().ToString();
            var cookieOptions = new CookieOptions { IsEssential = true, Expires = DateTime.Now.AddDays(30) };

            Response.Cookies.Append("buyerID", buyerID, cookieOptions);

            var cart = new Cart { BuyerID = buyerID };
            _context.Add(cart);
            return cart;

        }

        private CartDTO MapCart(Cart carts)
        {
            return new CartDTO
            {
                BuyerID = carts.BuyerID,
                ID = carts.ID,
                items = carts.Items.Select(item => new CartItemDTO
                {
                    Name = item.Product.Name,
                    ProductID = item.ProductID,
                    Brand = item.Product.Brand,
                    PictureURL = item.Product.PictureUrl,
                    Type = item.Product.Type,
                    Price = item.Product.Price,
                    Quantity = item.Quantity
                }).ToList()
            };
        }
    }
}