import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Grid, 
  Container, 
  Paper, 
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  Button,
  Avatar,
  LinearProgress,
  Divider
} from "@mui/material";
import Link from "next/link";
import { 
  Construction, 
  Inventory, 
  Groups, 
  TrendingUp, 
  Warning,
  CheckCircle,
  Schedule,
  Notifications,
  ArrowForward,
  LocalShipping,
  Build,
  Person,
  Today,
  Assessment
} from "@mui/icons-material";

const latestInfo = [
  {
    type: "urgent",
    title: "Livraison retardée - Chantier A",
    description: "Béton prévu à 9h, reporté à 14h à cause du trafic",
    time: "Il y a 30min",
    icon: LocalShipping,
    color: "#f44336"
  },
  {
    type: "success",
    title: "Chantier Lyon-Centre - 75% terminé",
    description: "Gros œuvre terminé avec 2 jours d'avance",
    time: "Il y a 1h",
    icon: CheckCircle,
    color: "#4caf50"
  },
  {
    type: "warning", 
    title: "Stock critique - Entrepôt Nord",
    description: "Ciment: 8 tonnes restantes (seuil: 15 tonnes)",
    time: "Il y a 2h",
    icon: Warning,
    color: "#ff9800"
  },
  {
    type: "info",
    title: "Nouvelle commande validée",
    description: "Villa Cannes - Matériaux pour 180K€ commandés",
    time: "Il y a 3h",
    icon: Build,
    color: "#2196f3"
  },
  {
    type: "meeting",
    title: "Réunion sécurité - 14h00",
    description: "Formation obligatoire équipe chantier B",
    time: "Aujourd'hui",
    icon: Groups,
    color: "#9c27b0"
  }
];

const quickStats = [
  { label: "Chantiers Actifs", value: "12", change: "+2 cette semaine", trend: "up", detail: "3 en retard" },
  { label: "Stock Critique", value: "4", change: "alertes actives", trend: "down", detail: "sur 156 articles" },
  { label: "Livraisons Aujourd'hui", value: "7", change: "2 en retard", trend: "neutral", detail: "5 à l'heure" },
  { label: "Équipes Actives", value: "8", change: "68 ouvriers", trend: "up", detail: "sur 6 sites" }
];

const todayPlanning = [
  { time: "09:00", event: "Livraison béton - Chantier A", type: "livraison", status: "retard" },
  { time: "10:30", event: "Visite client - Villa Cannes", type: "meeting", status: "ok" },
  { time: "14:00", event: "Formation sécurité - Équipe B", type: "formation", status: "ok" },
  { time: "15:30", event: "Réception matériaux - Entrepôt Sud", type: "livraison", status: "ok" },
  { time: "16:00", event: "Point avancement - Lyon Centre", type: "meeting", status: "ok" }
];

const teamActivity = [
  { name: "Jean Dupont", role: "Chef de chantier", status: "Sur site Lyon-Centre", activity: "active" },
  { name: "Marie Martin", role: "Responsable stock", status: "Entrepôt Nord", activity: "active" },
  { name: "Pierre Leroy", role: "Chef d'équipe", status: "En formation", activity: "busy" },
  { name: "Sophie Bernard", role: "Planification", status: "Bureau", activity: "active" }
];

export default function Home() {
  const getStatusColor = (status) => {
    switch(status) {
      case "retard": return "error";
      case "ok": return "success";
      case "attention": return "warning";
      default: return "default";
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4, pt: 12 }}>
      {/* Header avec heure */}
      <Box mb={4}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Box>
            <Typography variant="h4" fontWeight={700} color="primary" gutterBottom>
              Tableau de Bord
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Aperçu en temps réel de vos activités • {new Date().toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </Typography>
          </Box>
          <Box textAlign="right">
            <Typography variant="h5" fontWeight={700} color="primary">
              {new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Dernière mise à jour
            </Typography>
          </Box>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* Statistiques principales */}
        <Grid item xs={12}>
          <Grid container spacing={2}>
            {quickStats.map((stat, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card elevation={2} sx={{ height: "100%" }}>
                  <CardContent>
                    <Box display="flex" justifyContent="space-between" alignItems="start" mb={2}>
                      <Box>
                        <Typography variant="h4" fontWeight={800} color="primary" mb={0.5}>
                          {stat.value}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" fontWeight={600}>
                          {stat.label}
                        </Typography>
                      </Box>
                      <TrendingUp sx={{ color: stat.trend === "up" ? "#4caf50" : stat.trend === "down" ? "#f44336" : "#ff9800" }} />
                    </Box>
                    <Typography variant="caption" color="text.disabled" display="block" mb={0.5}>
                      {stat.change}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" fontWeight={500}>
                      {stat.detail}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Planning du jour */}
        <Grid item xs={12} md={8}>
          <Card elevation={2} sx={{ height: "100%" }}>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
                <Box display="flex" alignItems="center" gap={2}>
                  <Today sx={{ color: "primary.main" }} />
                  <Typography variant="h6" fontWeight={700} color="primary">
                    Planning du Jour
                  </Typography>
                </Box>
                <Button size="small" endIcon={<ArrowForward />}>
                  Voir semaine
                </Button>
              </Box>
              
              <List disablePadding>
                {todayPlanning.map((item, index) => (
                  <Box key={index}>
                    <ListItem sx={{ px: 0, py: 1.5 }}>
                      <Box display="flex" alignItems="center" width="100%">
                        <Box sx={{ minWidth: 60, mr: 2 }}>
                          <Typography variant="body2" fontWeight={600} color="primary">
                            {item.time}
                          </Typography>
                        </Box>
                        <Box flexGrow={1}>
                          <Typography variant="body2" fontWeight={600}>
                            {item.event}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {item.type}
                          </Typography>
                        </Box>
                        <Chip
                          label={item.status === "retard" ? "Retard" : "À l'heure"}
                          color={getStatusColor(item.status)}
                          size="small"
                          sx={{ fontSize: "0.7rem" }}
                        />
                      </Box>
                    </ListItem>
                    {index < todayPlanning.length - 1 && <Divider />}
                  </Box>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Équipe active */}
        <Grid item xs={12} md={4}>
          <Card elevation={2} sx={{ height: "100%" }}>
            <CardContent>
              <Box display="flex" alignItems="center" gap={2} mb={3}>
                <Person sx={{ color: "primary.main" }} />
                <Typography variant="h6" fontWeight={700} color="primary">
                  Équipe Active
                </Typography>
              </Box>
              
              <List disablePadding>
                {teamActivity.map((member, index) => (
                  <ListItem key={index} sx={{ px: 0, py: 1 }}>
                    <ListItemIcon>
                      <Avatar 
                        sx={{ 
                          width: 32, 
                          height: 32,
                          fontSize: "0.8rem",
                          background: member.activity === "active" ? "#4caf50" : "#ff9800"
                        }}
                      >
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </Avatar>
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography variant="body2" fontWeight={600}>
                          {member.name}
                        </Typography>
                      }
                      secondary={
                        <Box>
                          <Typography variant="caption" color="text.secondary" display="block">
                            {member.role}
                          </Typography>
                          <Typography variant="caption" color="text.disabled">
                            📍 {member.status}
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Alertes et notifications */}
        <Grid item xs={12}>
          <Card elevation={2}>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
                <Box display="flex" alignItems="center" gap={2}>
                  <Notifications sx={{ color: "primary.main" }} />
                  <Typography variant="h6" fontWeight={700} color="primary">
                    Notifications Récentes
                  </Typography>
                </Box>
                <Button size="small" endIcon={<ArrowForward />}>
                  Voir toutes
                </Button>
              </Box>
              
              <Grid container spacing={2}>
                {latestInfo.map((info, index) => (
                  <Grid item xs={12} md={6} key={index}>
                    <Box 
                      p={2} 
                      borderRadius={2}
                      sx={{ 
                        background: `${info.color}08`,
                        border: `1px solid ${info.color}20`,
                        transition: "all 0.2s ease",
                        "&:hover": {
                          background: `${info.color}12`,
                          transform: "translateY(-1px)"
                        }
                      }}
                    >
                      <Box display="flex" alignItems="start" gap={2}>
                        <Avatar 
                          sx={{ 
                            width: 32, 
                            height: 32, 
                            background: `${info.color}20`,
                            color: info.color 
                          }}
                        >
                          <info.icon sx={{ fontSize: 16 }} />
                        </Avatar>
                        <Box flexGrow={1}>
                          <Typography variant="body2" fontWeight={600} mb={0.5}>
                            {info.title}
                          </Typography>
                          <Typography variant="caption" color="text.secondary" display="block" mb={1}>
                            {info.description}
                          </Typography>
                          <Typography variant="caption" color="text.disabled">
                            {info.time}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>


      </Grid>
    </Container>
  );
}
