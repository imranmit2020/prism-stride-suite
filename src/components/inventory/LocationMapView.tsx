import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Warehouse, Plus, Navigation, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface WarehouseLocation {
  id: string;
  name: string;
  address: string;
  latitude?: number;
  longitude?: number;
  capacity: number;
  currentStock: number;
  products: Array<{
    name: string;
    quantity: number;
    sku: string;
  }>;
}

interface LocationMapViewProps {
  warehouses: any[];
  stockData: any[];
}

export function LocationMapView({ warehouses, stockData }: LocationMapViewProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState<string>('');
  const [showTokenDialog, setShowTokenDialog] = useState(false);
  const [showAssignLocationDialog, setShowAssignLocationDialog] = useState(false);
  const [selectedWarehouse, setSelectedWarehouse] = useState<string>('');
  const [newLatitude, setNewLatitude] = useState<string>('');
  const [newLongitude, setNewLongitude] = useState<string>('');
  const [markers, setMarkers] = useState<mapboxgl.Marker[]>([]);
  const { toast } = useToast();

  // Check for Mapbox token from Supabase secrets
  const loadMapboxToken = async () => {
    try {
      // In a real implementation, this would come from Supabase Edge Function secrets
      // For now, we'll use a temporary input field
      const storedToken = localStorage.getItem('mapbox_token');
      if (storedToken) {
        setMapboxToken(storedToken);
        return storedToken;
      } else {
        setShowTokenDialog(true);
        return null;
      }
    } catch (error) {
      console.error('Error loading Mapbox token:', error);
      setShowTokenDialog(true);
      return null;
    }
  };

  // Transform warehouses into map locations
  const mapLocations: WarehouseLocation[] = warehouses.map(warehouse => {
    const warehouseStock = stockData.filter(stock => 
      stock.bm_inv_warehouses?.name === warehouse.name
    );
    
    const products = warehouseStock.map(stock => ({
      name: stock.bm_inv_products?.name || 'Unknown Product',
      quantity: stock.quantity,
      sku: stock.bm_inv_products?.sku || 'N/A'
    }));

    const totalStock = products.reduce((sum, product) => sum + product.quantity, 0);

    return {
      id: warehouse.id,
      name: warehouse.name,
      address: warehouse.location || 'No address provided',
      latitude: warehouse.latitude || (40.7128 + Math.random() * 0.1), // Default NYC area with random offset
      longitude: warehouse.longitude || (-74.0060 + Math.random() * 0.1),
      capacity: warehouse.capacity || 1000,
      currentStock: totalStock,
      products
    };
  });

  // Initialize map
  const initializeMap = async (token: string) => {
    if (!mapContainer.current) return;

    mapboxgl.accessToken = token;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [-74.0060, 40.7128], // NYC default
      zoom: 10,
      pitch: 45,
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
      }),
      'top-right'
    );

    // Add markers for each warehouse location
    addWarehouseMarkers();

    map.current.on('click', (e) => {
      const { lng, lat } = e.lngLat;
      setNewLatitude(lat.toFixed(6));
      setNewLongitude(lng.toFixed(6));
      setShowAssignLocationDialog(true);
    });
  };

  // Add markers for warehouse locations
  const addWarehouseMarkers = () => {
    if (!map.current) return;

    // Clear existing markers
    markers.forEach(marker => marker.remove());
    const newMarkers: mapboxgl.Marker[] = [];

    mapLocations.forEach(location => {
      const utilizationPercentage = Math.round((location.currentStock / location.capacity) * 100);
      
      // Create marker element
      const markerElement = document.createElement('div');
      markerElement.className = 'warehouse-marker';
      markerElement.style.cssText = `
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: ${utilizationPercentage >= 90 ? '#ef4444' : utilizationPercentage >= 70 ? '#f59e0b' : '#10b981'};
        border: 3px solid white;
        box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: bold;
        font-size: 12px;
      `;
      markerElement.textContent = location.name.charAt(0);

      // Create popup
      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
        <div class="p-3">
          <h3 class="font-bold text-lg">${location.name}</h3>
          <p class="text-sm text-gray-600 mb-2">${location.address}</p>
          <div class="grid grid-cols-2 gap-2 text-sm">
            <div>
              <span class="text-gray-500">Capacity:</span>
              <br><span class="font-medium">${location.capacity} units</span>
            </div>
            <div>
              <span class="text-gray-500">Current Stock:</span>
              <br><span class="font-medium">${location.currentStock} units</span>
            </div>
          </div>
          <div class="mt-2">
            <span class="text-gray-500">Utilization:</span>
            <br><span class="font-medium">${utilizationPercentage}%</span>
          </div>
          ${location.products.length > 0 ? `
            <div class="mt-2">
              <span class="text-gray-500">Top Products:</span>
              <ul class="text-xs mt-1">
                ${location.products.slice(0, 3).map(product => 
                  `<li>• ${product.name}: ${product.quantity} units</li>`
                ).join('')}
              </ul>
            </div>
          ` : ''}
        </div>
      `);

      // Create marker
      const marker = new mapboxgl.Marker(markerElement)
        .setLngLat([location.longitude, location.latitude])
        .setPopup(popup)
        .addTo(map.current!);

      newMarkers.push(marker);
    });

    setMarkers(newMarkers);
  };

  // Handle token submission
  const handleTokenSubmit = () => {
    if (mapboxToken) {
      localStorage.setItem('mapbox_token', mapboxToken);
      setShowTokenDialog(false);
      initializeMap(mapboxToken);
    } else {
      toast({
        title: "Token Required",
        description: "Please enter a valid Mapbox token",
        variant: "destructive"
      });
    }
  };

  // Assign geographic location to warehouse
  const handleAssignLocation = async () => {
    if (!selectedWarehouse || !newLatitude || !newLongitude) {
      toast({
        title: "Missing Information",
        description: "Please select a warehouse and coordinates",
        variant: "destructive"
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('bm_inv_warehouses')
        .update({
          latitude: parseFloat(newLatitude),
          longitude: parseFloat(newLongitude)
        })
        .eq('id', selectedWarehouse);

      if (error) throw error;

      toast({
        title: "Location Assigned",
        description: "Geographic coordinates assigned to warehouse successfully",
      });

      setShowAssignLocationDialog(false);
      setSelectedWarehouse('');
      setNewLatitude('');
      setNewLongitude('');
      
      // Refresh map markers
      if (map.current) {
        addWarehouseMarkers();
      }
    } catch (error) {
      console.error('Error assigning location:', error);
      toast({
        title: "Assignment Failed",
        description: "Failed to assign geographic location",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    const initMap = async () => {
      const token = await loadMapboxToken();
      if (token) {
        initializeMap(token);
      }
    };

    initMap();

    // Cleanup
    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, []);

  // Update markers when data changes
  useEffect(() => {
    if (map.current && mapboxToken) {
      addWarehouseMarkers();
    }
  }, [mapLocations, mapboxToken]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <MapPin className="h-5 w-5 text-blue-500" />
            Geographic Location Map
          </h3>
          <p className="text-sm text-muted-foreground">
            Interactive map showing warehouse locations and inventory distribution
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowTokenDialog(true)}>
            <Settings className="h-4 w-4 mr-2" />
            Map Settings
          </Button>
          <Button onClick={() => setShowAssignLocationDialog(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Assign Location
          </Button>
        </div>
      </div>

      {/* Map Container */}
      <Card>
        <CardContent className="p-0">
          <div 
            ref={mapContainer} 
            className="h-[500px] w-full rounded-lg"
            style={{ minHeight: '500px' }}
          />
        </CardContent>
      </Card>

      {/* Location Statistics */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Warehouse className="h-4 w-4 text-blue-500" />
              Total Warehouses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mapLocations.length}</div>
            <p className="text-xs text-muted-foreground">
              {mapLocations.filter(l => l.latitude && l.longitude).length} with GPS coordinates
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Navigation className="h-4 w-4 text-green-500" />
              Total Inventory
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mapLocations.reduce((sum, location) => sum + location.currentStock, 0)}
            </div>
            <p className="text-xs text-muted-foreground">units across all locations</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <MapPin className="h-4 w-4 text-purple-500" />
              Coverage Area
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mapLocations.filter(l => l.latitude && l.longitude).length > 0 ? 'Active' : 'Setup'}
            </div>
            <p className="text-xs text-muted-foreground">
              {mapLocations.filter(l => l.latitude && l.longitude).length > 0 
                ? 'Real-time tracking enabled' 
                : 'Configure locations to enable'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Mapbox Token Dialog */}
      <Dialog open={showTokenDialog} onOpenChange={setShowTokenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Mapbox Configuration</DialogTitle>
            <DialogDescription>
              Enter your Mapbox public token to enable geographic mapping features.
              Get your token from <a href="https://mapbox.com/" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">mapbox.com</a>
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="token">Mapbox Public Token</Label>
              <Input
                id="token"
                type="password"
                placeholder="pk.eyJ1IjoieW91ci11c2VybmFtZSIsImEiOiJjbHh4eHh4eHgwYWEwMm1wYWNzc29hc2oifQ.xxxxx"
                value={mapboxToken}
                onChange={(e) => setMapboxToken(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Your token will be stored locally. For production, add it to Supabase Edge Function Secrets.
              </p>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowTokenDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleTokenSubmit}>
              Save & Initialize Map
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Assign Location Dialog */}
      <Dialog open={showAssignLocationDialog} onOpenChange={setShowAssignLocationDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Assign Geographic Location</DialogTitle>
            <DialogDescription>
              Assign GPS coordinates to a warehouse for precise location tracking
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label>Warehouse</Label>
              <Select value={selectedWarehouse} onValueChange={setSelectedWarehouse}>
                <SelectTrigger>
                  <SelectValue placeholder="Select warehouse" />
                </SelectTrigger>
                <SelectContent>
                  {warehouses.map((warehouse) => (
                    <SelectItem key={warehouse.id} value={warehouse.id}>
                      {warehouse.name} - {warehouse.location || 'No location set'}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="latitude">Latitude</Label>
                <Input
                  id="latitude"
                  type="number"
                  step="0.000001"
                  placeholder="40.712800"
                  value={newLatitude}
                  onChange={(e) => setNewLatitude(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="longitude">Longitude</Label>
                <Input
                  id="longitude"
                  type="number"
                  step="0.000001"
                  placeholder="-74.006000"
                  value={newLongitude}
                  onChange={(e) => setNewLongitude(e.target.value)}
                />
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Click on the map to automatically fill coordinates, or enter them manually.
            </p>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowAssignLocationDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleAssignLocation}>
              Assign Location
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}