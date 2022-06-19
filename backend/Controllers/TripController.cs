using TripManager.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TripManager.Models;

namespace TripManager.Controllers
{

    [ApiController]
    [Route("/trip/[controller]")]
    public class TripController : Controller
    {
        private readonly ITripRepository tripRepository;

        public TripController(ITripRepository transactionRepository)
        {
            this.tripRepository = transactionRepository;
        }

        [HttpPost("/trip")]
        public async Task<IActionResult> Create([FromBody] Trip trip)
        {
            try
            {
                var res = await tripRepository.AddTrip(trip);
                return Ok(res);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        [HttpGet("/trip/all/{userId}")]
        public async Task<IActionResult> Get(string userId)
        {   
            try{
                var users = await tripRepository.GetAllTrips(userId);
                return Ok(users);
            }catch(Exception e){
                return StatusCode(500,e.Message);
            }
        }

        [HttpPut("/trip")]
        public async Task<IActionResult> Put([FromBody] Trip trip)
        {
            try
            {
                await tripRepository.UpdateTrip(trip);
                return Ok(trip);
            }catch(Exception e)
            {
                return StatusCode(500, e.Message);
            }

        }

        [HttpDelete("/trip/{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            try
            {
                await tripRepository.DeleteTrip(id);
                return Ok();
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

    }
}
