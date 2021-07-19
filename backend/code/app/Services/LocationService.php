<?php

namespace App\Services;

use Geocoder\Location;
use Geocoder\Provider\LocationIQ\LocationIQ;
use Geocoder\Query\GeocodeQuery;
use Geocoder\Query\ReverseQuery;
use Geocoder\StatefulGeocoder;
use Http\Adapter\Guzzle6\Client as HttpClient;

class LocationService
{
    private string $apiKey;

    private HttpClient $httpClient;

    private StatefulGeocoder $geocoder;

    public function __construct()
    {
        $this->apiKey = env('LOCATION_IQ_API_KEY');
        $this->httpClient = new HttpClient();
        $provider = new LocationIQ($this->httpClient, $this->apiKey);
        $this->geocoder = new StatefulGeocoder($provider);
    }

    /**
     * Retrieve location with given query.
     *
     * @param string $query
     * @return Collection[]
     */
    public function geocode(string $query)
    {
        return $this->geocoder->geocodeQuery(GeocodeQuery::create($query));
    }

    /**
     * Retrieve location with given latitude and
     * longitude.
     *
     * @param float $latitude
     * @param float $longitude
     * @return Collection[]
     */
    public function reverseGeocode(float $latitude, float $longitude)
    {
        return $this->geocoder->reverseQuery(ReverseQuery::fromCoordinates($latitude, $longitude));
    }

    /**
     * Format the location object to a usable
     * array to parse to json for example.
     *
     * @param Location $location
     * @return array
     */
    public function formatAddress(Location $location)
    {
        $country = $location->getCountry();
        $coordinates = $location->getCoordinates();

        return [
            'coordinates' => [
                'latitude' => $coordinates->getLatitude(),
                'longitude' => $coordinates->getLongitude()
            ],
            'street_number' => $location->getStreetNumber(),
            'street_name' => $location->getStreetName(),
            'city' => $location->getLocality(),
            'postal_code' => $location->getPostalCode(),
            'country' => $country->getName(),
            'country_code' => $country->getCode(),
        ];
    }
}