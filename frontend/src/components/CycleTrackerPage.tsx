import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Calendar } from './ui/calendar';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Calendar as CalendarIcon, Droplet, Heart, Moon, Sun, TrendingUp } from 'lucide-react';
import { useState } from 'react';

export function CycleTrackerPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const cycleData = {
    currentDay: 14,
    cycleLength: 28,
    periodLength: 5,
    nextPeriod: 'En 14 días',
    currentPhase: 'Ovulación',
    fertility: 'Alta',
  };

  const symptoms = [
    { name: 'Dolor abdominal', severity: 'Leve', color: 'bg-yellow-500' },
    { name: 'Cambios de humor', severity: 'Moderado', color: 'bg-orange-500' },
    { name: 'Fatiga', severity: 'Leve', color: 'bg-yellow-500' },
  ];

  const phases = [
    {
      name: 'Menstrual',
      days: '1-5',
      icon: Droplet,
      color: 'text-red-500',
      description: 'Fase de sangrado',
    },
    {
      name: 'Folicular',
      days: '6-13',
      icon: Sun,
      color: 'text-orange-500',
      description: 'Preparación del óvulo',
    },
    {
      name: 'Ovulación',
      days: '14',
      icon: Heart,
      color: 'text-pink-500',
      description: 'Liberación del óvulo',
    },
    {
      name: 'Lútea',
      days: '15-28',
      icon: Moon,
      color: 'text-purple-500',
      description: 'Preparación para el período',
    },
  ];

  const history = [
    { month: 'Septiembre 2025', cycleLength: 28, periodLength: 5 },
    { month: 'Agosto 2025', cycleLength: 30, periodLength: 4 },
    { month: 'Julio 2025', cycleLength: 27, periodLength: 5 },
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1>Rastreador de Ciclo Menstrual</h1>
        <p className="text-muted-foreground mt-2">
          Lleva un registro de tu ciclo y comprende mejor tu cuerpo
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Current Cycle Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Ciclo Actual</CardTitle>
              <CardDescription>Día {cycleData.currentDay} de {cycleData.cycleLength}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">Progreso del ciclo</span>
                  <span className="text-sm text-muted-foreground">
                    {Math.round((cycleData.currentDay / cycleData.cycleLength) * 100)}%
                  </span>
                </div>
                <Progress value={(cycleData.currentDay / cycleData.cycleLength) * 100} />
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-pink-50 dark:bg-pink-950/20">
                  <p className="text-sm text-muted-foreground mb-1">Fase actual</p>
                  <p className="font-semibold text-pink-600 dark:text-pink-400">
                    {cycleData.currentPhase}
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-purple-50 dark:bg-purple-950/20">
                  <p className="text-sm text-muted-foreground mb-1">Fertilidad</p>
                  <p className="font-semibold text-purple-600 dark:text-purple-400">
                    {cycleData.fertility}
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950/20">
                  <p className="text-sm text-muted-foreground mb-1">Próximo período</p>
                  <p className="font-semibold text-blue-600 dark:text-blue-400">
                    {cycleData.nextPeriod}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Calendar */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5" />
                Calendario
              </CardTitle>
              <CardDescription>Selecciona una fecha para registrar información</CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border mx-auto"
              />
              <div className="mt-4 flex gap-2 flex-wrap justify-center">
                <div className="flex items-center gap-2 text-xs">
                  <div className="h-3 w-3 rounded-full bg-red-500"></div>
                  <span>Período</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <div className="h-3 w-3 rounded-full bg-pink-500"></div>
                  <span>Ovulación</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                  <span>Fertilidad alta</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Symptoms Today */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Síntomas de Hoy</CardTitle>
                  <CardDescription>Registra cómo te sientes</CardDescription>
                </div>
                <Button variant="outline" size="sm">Agregar síntoma</Button>
              </div>
            </CardHeader>
            <CardContent>
              {symptoms.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">
                  No hay síntomas registrados hoy
                </p>
              ) : (
                <div className="space-y-3">
                  {symptoms.map((symptom, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`h-3 w-3 rounded-full ${symptom.color}`}></div>
                        <span>{symptom.name}</span>
                      </div>
                      <Badge variant="secondary">{symptom.severity}</Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Cycle Phases */}
          <Card>
            <CardHeader>
              <CardTitle>Fases del Ciclo</CardTitle>
              <CardDescription>Comprende tu ciclo menstrual</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {phases.map((phase, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg bg-muted ${phase.color}`}>
                    <phase.icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-sm">{phase.name}</h4>
                      <span className="text-xs text-muted-foreground">Día {phase.days}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{phase.description}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* History */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Historial
              </CardTitle>
              <CardDescription>Ciclos anteriores</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {history.map((record, index) => (
                <div key={index} className="p-3 border rounded-lg">
                  <h4 className="text-sm mb-2">{record.month}</h4>
                  <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                    <div>
                      <span>Ciclo: </span>
                      <span className="font-semibold text-foreground">{record.cycleLength} días</span>
                    </div>
                    <div>
                      <span>Período: </span>
                      <span className="font-semibold text-foreground">{record.periodLength} días</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Tips */}
          <Card className="bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-950/20 dark:to-purple-950/20 border-pink-200 dark:border-pink-900">
            <CardHeader>
              <CardTitle className="text-sm">💡 Consejo del día</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">
                Durante la ovulación, tu temperatura basal aumenta ligeramente.
                Registrar estos cambios puede ayudarte a conocer mejor tu ciclo.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
