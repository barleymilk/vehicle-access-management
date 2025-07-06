import { Button } from "@/components/ui/button";
import { Vehicle } from "@/lib/types";
import { Badge } from "@/components/ui/badge";

export const VehicleSelector = ({
  vehicles,
  onSelect,
  onGoBack,
}: {
  vehicles: Vehicle[];
  onSelect: (vehicle: Vehicle) => void;
  onGoBack: () => void;
}) => {
  return (
    <div>
      <Button onClick={onGoBack} className="mb-4">
        다시 검색
      </Button>
      <div>
        {vehicles.map((selectedVehicle) => (
          <Button
            key={selectedVehicle.id}
            className="w-full mb-2 relative"
            onClick={() => {
              onSelect(selectedVehicle);
            }}
          >
            <div className="flex items-center justify-center w-full">
              {selectedVehicle.plate_number}
              {selectedVehicle.vehicle_type &&
                selectedVehicle.is_public_vehicle &&
                ` (${"공용 - " + selectedVehicle.vehicle_type})`}
              {selectedVehicle.vehicle_type &&
                !selectedVehicle.is_public_vehicle &&
                ` (${selectedVehicle.vehicle_type})`}
            </div>
            {selectedVehicle.is_free_pass_enabled && (
              <Badge
                variant="destructive"
                className="absolute right-2 font-bold text-white"
              >
                프리패스
              </Badge>
            )}
          </Button>
        ))}
      </div>
    </div>
  );
};
