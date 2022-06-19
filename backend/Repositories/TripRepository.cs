// create a class Triprepository implementing ITripRepository
using System.Collections.Generic;
using System.Threading.Tasks;
using TripManager.Models;
using Dapper;
namespace TripManager.Repositories
{
    public class TripRepository : ITripRepository
    {
        private readonly Context context;
        public TripRepository(Context context){
            this.context = context;
        }

        public async Task<Trip> AddTrip(Trip Trip)
        {
            var query = "INSERT INTO trips (Id, Name, StartDate, EndDate, Description, Destination, Budget, Image, UserId) VALUES(@Id, @Name, @StartDate, @EndDate, @Description, @Destination, @Budget, @Image, @UserId)";
            using var connection = context.CreateConnection();
            var result = await connection.ExecuteAsync(query, Trip);
            return Trip;
        }


        public async Task<IEnumerable<Trip>> GetAllTrips(string Id)
        {
            var query = "SELECT * FROM trips WHERE UserId = @Id";
            using var connection = context.CreateConnection();
            var res = await connection.QueryAsync<Trip>(query, new { Id });
            return res;
        }

        public async Task<dynamic> DeleteTrip(string id)
        {
            var sql = "DELETE FROM trips WHERE Id = @Id";
            using (var connection = context.CreateConnection())
            {
                return await connection.QueryFirstAsync<Trip>(sql, new { Id = id });
            }
        }
        

        public async Task<Trip> UpdateTrip(Trip Trip)
        {
            var query = "UPDATE trips SET Name = @Name, StartDate = @StartDate, EndDate = @EndDate, Description = @Description, Destination = @Destination, Budget = @Budget, Image = @Image, UserId = @UserId WHERE Id = @Id";
            using (var connection = context.CreateConnection())
            {
                var res = await connection.QueryAsync<Trip>(query, Trip);
                return Trip;
            }
        }

    }
}