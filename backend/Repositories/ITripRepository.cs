using System.Collections.Generic;
using System.Threading.Tasks;
using TripManager.Models;

namespace TripManager.Repositories
{
    public interface ITripRepository
    {
        public Task<IEnumerable<Trip>> GetAllTrips(string Id);
        public Task<Trip> AddTrip(Trip Trip);
        public Task<dynamic> DeleteTrip(string id);
        public Task<Trip> UpdateTrip(Trip Trip);

    }
}