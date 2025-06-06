import { Link } from 'react-router-dom';
import { Star, MapPin, DoorOpen } from 'lucide-react';
import { Hostel } from '../../../types';
import Card from '../../ui/Card';
import Button from '../../ui/Button';

type HostelCardProps = {
  hostel: Hostel;
};

const HostelCard = ({ hostel }: HostelCardProps) => {
  // Get room availability stats
  const availableRooms = hostel.rooms.filter(room => room.available).length;
  const totalRooms = hostel.rooms.length;

  return (
    <Card interactive className="h-full flex flex-col">
      <div className="relative h-48">
        <img
          src={hostel.imageUrls[0]}
          alt={hostel.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent text-white p-3">
          <div className="flex justify-between items-end">
            <h3 className="font-bold text-lg">{hostel.name}</h3>
            <div className="flex items-center bg-secondary-600 px-2 py-1 rounded-full text-xs">
              <Star className="h-3 w-3 mr-1 fill-white text-white" />
              {hostel.rating}
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-4 flex-grow flex flex-col justify-between">
        <div>
          <div className="flex items-center text-sm text-gray-600 mb-2">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{hostel.location.address}</span>
          </div>
          
          <p className="text-gray-500 mb-3 text-sm line-clamp-2">{hostel.description}</p>
          
          <div className="flex flex-wrap gap-1 mb-4">
            {hostel.amenities.slice(0, 3).map((amenity, index) => (
              <span key={index} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                {amenity}
              </span>
            ))}
            {hostel.amenities.length > 3 && (
              <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                +{hostel.amenities.length - 3} more
              </span>
            )}
          </div>
          
          {/* Room Availability */}
          <div className="flex items-center mb-4 text-sm">
            <DoorOpen className="h-4 w-4 mr-1 text-primary-900" />
            <span className="text-gray-600">
              {availableRooms} of {totalRooms} rooms available
            </span>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-end">
            <div className="bg-primary-900 text-white text-sm rounded-full px-3 py-1">
              {hostel.university.split(' ')[0]}
            </div>
          </div>
          
          <Link to={`/hostels/${hostel.id}`}>
            <Button
              variant="primary"
              fullWidth
              icon={<DoorOpen className="h-4 w-4" />}
              iconPosition="left"
            >
              View Rooms
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default HostelCard;