<?php

namespace App\Http\Controllers;

use App\Services\LocationService;
use Illuminate\Http\Request;

class LocationController extends Controller
{
    public function __construct(LocationService $locationService)
    {
        $this->locationService = $locationService;
    }

    /**
     * Display location from Location IQ.
     * 
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function getLocationFromCoordinates(Request $request)
    {
        $latitude = $request->input('latitude');
        $longitude = $request->input('longitude');

        $locationCollection = $this->locationService->reverseGeocode($latitude, $longitude);

        if (!$locationCollection->isEmpty()) {
            $data = $this->locationService->formatAddress($locationCollection->first());
            return response()->json($data);
        }

        return response()->json(['message' => 'No valid fields sent'], 400)
                    ->header('Content-Type', 'application/json');
    }
}
