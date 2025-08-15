import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Cloud, Droplets, Wind, Thermometer, Eye, AlertTriangle, CheckCircle, MapPin, RefreshCw } from 'lucide-react';
import axios from 'axios';
import { toast } from '@/components/ui/use-toast';

interface WeatherData {
  main: {
    temp: number;
    humidity: number;
    pressure: number;
    feels_like: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
    deg: number;
  };
  visibility: number;
  clouds: {
    all: number;
  };
  rain?: {
    '1h': number;
  };
  name: string;
  sys: {
    country: string;
  };
}

const API_KEY = '2266f269be41b5b6234971e5e0a7e46d';

export default function Clima() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [city, setCity] = useState('São Paulo');
  const [loading, setLoading] = useState(false);

  const fetchWeatherData = async (cityName: string) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric&lang=pt_br`
      );
      setWeatherData(response.data);
      toast({
        title: "Dados atualizados",
        description: `Previsão do tempo para ${response.data.name} carregada com sucesso.`,
      });
    } catch (error) {
      console.error('Erro ao buscar dados do tempo:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os dados do tempo. Verifique o nome da cidade.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData(city);
  }, []);

  const handleSearch = () => {
    if (city.trim()) {
      fetchWeatherData(city.trim());
    }
  };

  const windSpeedKmh = weatherData ? Math.round(weatherData.wind.speed * 3.6) : 0;
  const isGoodForSpraying = windSpeedKmh <= 6;
  const rainfall = weatherData?.rain?.['1h'] || 0;
  const visibility = weatherData ? Math.round(weatherData.visibility / 1000) : 0;

  const getFlightConditions = () => {
    if (!weatherData) return { status: 'unknown', message: 'Carregando dados...' };
    
    const conditions = [];
    
    if (windSpeedKmh > 6) {
      conditions.push('Vento muito forte para pulverização');
    }
    
    if (rainfall > 0) {
      conditions.push('Chuva detectada');
    }
    
    if (visibility < 3) {
      conditions.push('Visibilidade baixa');
    }
    
    if (weatherData.clouds.all > 80) {
      conditions.push('Céu muito nublado');
    }
    
    if (conditions.length === 0) {
      return { 
        status: 'good', 
        message: 'Condições ideais para voo e pulverização' 
      };
    } else if (conditions.length <= 2) {
      return { 
        status: 'warning', 
        message: `Atenção: ${conditions.join(', ')}` 
      };
    } else {
      return { 
        status: 'bad', 
        message: `Condições desfavoráveis: ${conditions.join(', ')}` 
      };
    }
  };

  const flightConditions = getFlightConditions();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Previsão do Tempo</h1>
          <p className="text-muted-foreground">Condições meteorológicas para operações de drone agrícola</p>
        </div>
      </div>

      {/* Busca por cidade */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Localização
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Digite o nome da cidade"
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <Button onClick={handleSearch} disabled={loading}>
              {loading ? <RefreshCw className="h-4 w-4 animate-spin" /> : 'Buscar'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {weatherData && (
        <>
          {/* Alerta de condições de voo */}
          <Alert className={`${
            flightConditions.status === 'good' 
              ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950' 
              : flightConditions.status === 'warning'
              ? 'border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950'
              : 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950'
          }`}>
            <div className="flex items-center gap-2">
              {flightConditions.status === 'good' ? (
                <CheckCircle className="h-4 w-4 text-green-600" />
              ) : (
                <AlertTriangle className="h-4 w-4 text-yellow-600" />
              )}
              <AlertDescription className="font-medium">
                {flightConditions.message}
              </AlertDescription>
            </div>
          </Alert>

          {/* Informações principais */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Temperatura</CardTitle>
                <Thermometer className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{Math.round(weatherData.main.temp)}°C</div>
                <p className="text-xs text-muted-foreground">
                  Sensação: {Math.round(weatherData.main.feels_like)}°C
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Vento</CardTitle>
                <Wind className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{windSpeedKmh} km/h</div>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant={isGoodForSpraying ? "default" : "destructive"}>
                    {isGoodForSpraying ? "Ideal para pulverização" : "Muito forte"}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Umidade</CardTitle>
                <Droplets className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{weatherData.main.humidity}%</div>
                <p className="text-xs text-muted-foreground">
                  {weatherData.main.humidity > 70 ? "Alta umidade" : "Umidade normal"}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Visibilidade</CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{visibility} km</div>
                <p className="text-xs text-muted-foreground">
                  {visibility > 5 ? "Boa visibilidade" : "Visibilidade limitada"}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Detalhes para operação de drone */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Condições de Pulverização</CardTitle>
                <CardDescription>Parâmetros específicos para aplicação agrícola</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Velocidade do vento</span>
                  <Badge variant={windSpeedKmh <= 6 ? "default" : "destructive"}>
                    {windSpeedKmh} km/h {windSpeedKmh <= 6 ? "✓" : "✗"}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Precipitação</span>
                  <Badge variant={rainfall === 0 ? "default" : "destructive"}>
                    {rainfall > 0 ? `${rainfall} mm/h ✗` : "Sem chuva ✓"}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Umidade relativa</span>
                  <Badge variant={weatherData.main.humidity >= 50 && weatherData.main.humidity <= 90 ? "default" : "secondary"}>
                    {weatherData.main.humidity}% {weatherData.main.humidity >= 50 && weatherData.main.humidity <= 90 ? "✓" : "⚠"}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Temperatura</span>
                  <Badge variant={weatherData.main.temp >= 10 && weatherData.main.temp <= 35 ? "default" : "secondary"}>
                    {Math.round(weatherData.main.temp)}°C {weatherData.main.temp >= 10 && weatherData.main.temp <= 35 ? "✓" : "⚠"}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Condições Meteorológicas</CardTitle>
                <CardDescription>Estado atual do tempo em {weatherData.name}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <Cloud className="h-5 w-5 text-muted-foreground" />
                  <span className="capitalize">{weatherData.weather[0].description}</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Nebulosidade</span>
                    <span>{weatherData.clouds.all}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pressão</span>
                    <span>{weatherData.main.pressure} hPa</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Direção do vento</span>
                    <span>{weatherData.wind.deg}°</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recomendações */}
          <Card>
            <CardHeader>
              <CardTitle>Recomendações para Operação</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2">Condições Ideais:</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Vento entre 2-6 km/h</li>
                    <li>• Ausência de chuva</li>
                    <li>• Umidade 50-90%</li>
                    <li>• Temperatura 10-35°C</li>
                    <li>• Visibilidade maior que 5 km</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-red-700 dark:text-red-400 mb-2">Evitar Voo Quando:</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Vento maior que 6 km/h</li>
                    <li>• Presença de chuva</li>
                    <li>• Visibilidade menor que 3 km</li>
                    <li>• Temperatura extrema</li>
                    <li>• Tempestades previstas</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}