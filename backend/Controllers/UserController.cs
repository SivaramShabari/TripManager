using TripManager.Models;
using TripManager.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TripManager.Controllers
{

    [ApiController]
    [Route("/user/[controller]")]
    public class UserController : Controller
    {
        private readonly IUserRepository userRepository;

        public UserController(IUserRepository userRepository)
        {
            this.userRepository = userRepository;
        }


        [HttpPut("/user/update")]
        public async Task<IActionResult> UpdateUser([FromBody] User user)
        {
            try
            {
                var updatedUser = await userRepository.UpdateUser(user);
                return Ok(updatedUser);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        [HttpPost("/user/add")]
        public async Task<IActionResult> AddUser([FromBody] User user)
        {
            try
            {
                var newUser = await userRepository.AddUser(user);
                return Ok(newUser);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        [HttpDelete("/user/delete/{id}")]
        public async Task<IActionResult> DeleteUser(string id)
        {
            try
            {
                await userRepository.DeleteUser(id);
                return Ok("Deleted User record");
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        [HttpGet("/user/one/{id}")]
        public async Task<IActionResult> GetUser(string id)
        {
            try
            {
                var user = await userRepository.GetUser(id);
                return Ok(user);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

    }
}
