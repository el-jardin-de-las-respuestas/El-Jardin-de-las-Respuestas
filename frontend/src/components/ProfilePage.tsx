import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { User, Mail, Calendar, Shield, Bell, Palette, MapPin } from 'lucide-react';
import { Switch } from './ui/switch';
import { useState } from 'react';
import { useTour } from '../hooks/useTour';

type ProfilePageProps = {
  userName: string;
};

export function ProfilePage({ userName }: ProfilePageProps) {
  const [notifications, setNotifications] = useState(true);
  const [communityUpdates, setCommunityUpdates] = useState(true);
  const [blogUpdates, setBlogUpdates] = useState(false);
  const { startWelcomeTour } = useTour();

  const handleRestartTour = () => {
    localStorage.removeItem('tourCompleted');
    startWelcomeTour();
  };

  const userStats = [
    { label: 'Miembro desde', value: 'Octubre 2025' },
    { label: 'Publicaciones', value: '12' },
    { label: 'Comentarios', value: '45' },
    { label: 'Artículos guardados', value: '28' },
  ];

  const initials = userName
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1>Mi Perfil</h1>
        <p className="text-muted-foreground mt-2">
          Administra tu información personal y preferencias
        </p>
      </div>

      <div className="grid gap-6">
        {/* Profile Header */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-6">
              <Avatar className="h-20 w-20">
                <AvatarFallback className="bg-pink-100 dark:bg-pink-900 text-pink-700 dark:text-pink-300 text-xl">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2>{userName}</h2>
                <p className="text-muted-foreground">Miembro activo</p>
                <div className="flex gap-2 mt-2">
                  <Badge variant="secondary">Verificado</Badge>
                  <Badge variant="outline">Colaboradora</Badge>
                </div>
              </div>
              <Button variant="outline">Editar foto</Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-4">
          {userStats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="pt-6 text-center">
                <div className="text-2xl text-pink-600 dark:text-pink-400 mb-1">
                  {stat.value}
                </div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Información Personal
            </CardTitle>
            <CardDescription>Tu información básica de perfil</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre completo</Label>
                <Input id="name" defaultValue={userName} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="usuario@ejemplo.com" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">Biografía</Label>
              <Input
                id="bio"
                placeholder="Cuéntanos un poco sobre ti (opcional)"
              />
            </div>
            <Button>Guardar cambios</Button>
          </CardContent>
        </Card>

        {/* Privacy & Security */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Privacidad y Seguridad
            </CardTitle>
            <CardDescription>Administra la seguridad de tu cuenta</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4>Cambiar contraseña</h4>
                <p className="text-sm text-muted-foreground">
                  Actualiza tu contraseña regularmente
                </p>
              </div>
              <Button variant="outline">Cambiar</Button>
            </div>
            <div className="flex items-center justify-between pt-4 border-t">
              <div>
                <h4>Perfil privado</h4>
                <p className="text-sm text-muted-foreground">
                  Oculta tu perfil de otros usuarios
                </p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between pt-4 border-t">
              <div>
                <h4>Modo anónimo en comunidad</h4>
                <p className="text-sm text-muted-foreground">
                  Tus publicaciones aparecerán como "Anónimo"
                </p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notificaciones
            </CardTitle>
            <CardDescription>Elige qué notificaciones recibir</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4>Notificaciones generales</h4>
                <p className="text-sm text-muted-foreground">
                  Recibe actualizaciones importantes
                </p>
              </div>
              <Switch
                checked={notifications}
                onCheckedChange={setNotifications}
              />
            </div>
            <div className="flex items-center justify-between pt-4 border-t">
              <div>
                <h4>Actualizaciones de la comunidad</h4>
                <p className="text-sm text-muted-foreground">
                  Respuestas a tus publicaciones y menciones
                </p>
              </div>
              <Switch
                checked={communityUpdates}
                onCheckedChange={setCommunityUpdates}
              />
            </div>
            <div className="flex items-center justify-between pt-4 border-t">
              <div>
                <h4>Nuevos artículos del blog</h4>
                <p className="text-sm text-muted-foreground">
                  Notificaciones cuando se publiquen nuevos artículos
                </p>
              </div>
              <Switch
                checked={blogUpdates}
                onCheckedChange={setBlogUpdates}
              />
            </div>
          </CardContent>
        </Card>

        {/* Preferences */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Preferencias
            </CardTitle>
            <CardDescription>Personaliza tu experiencia</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4>Tema de la aplicación</h4>
                <p className="text-sm text-muted-foreground">
                  El tema actual se configura desde el botón superior
                </p>
              </div>
              <Badge variant="secondary">Sistema</Badge>
            </div>
            <div className="flex items-center justify-between pt-4 border-t">
              <div>
                <h4>Recordatorios de ciclo</h4>
                <p className="text-sm text-muted-foreground">
                  Recibe recordatorios sobre tu ciclo menstrual
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between pt-4 border-t">
              <div>
                <h4>Tour de la aplicación</h4>
                <p className="text-sm text-muted-foreground">
                  Vuelve a ver el recorrido guiado de la plataforma
                </p>
              </div>
              <Button variant="outline" size="sm" onClick={handleRestartTour}>
                <MapPin className="h-4 w-4 mr-2" />
                Reiniciar tour
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="border-destructive">
          <CardHeader>
            <CardTitle className="text-destructive">Zona de Peligro</CardTitle>
            <CardDescription>Acciones irreversibles</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4>Eliminar cuenta</h4>
                <p className="text-sm text-muted-foreground">
                  Elimina permanentemente tu cuenta y todos tus datos
                </p>
              </div>
              <Button variant="destructive">Eliminar</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
