"use client";
import { useState, useMemo, useEffect } from "react";
import { useNavbar } from "../context/NavbarContext";
import { 
  Drawer, 
  Card, 
  CardContent, 
  Typography, 
  Grid, 
  Button, 
  Box,
  Container,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  LinearProgress,
  Divider,
  IconButton,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ButtonGroup
} from "@mui/material";
import { 
  Schedule, 
  People, 
  Warning, 
  CheckCircle, 
  Close,
  LocationOn,
  CalendarToday,
  TrendingUp,
  Build,
  Assignment,
  Search,
  FilterList,
  Sort,
  Clear
} from "@mui/icons-material";

const chantiers = [
  { 
    id: 1, 
    nom: "Résidence Les Jardins", 
    lieu: "Paris 15ème",
    client: "SCI Immobilier Plus",
    statut: "En cours",
    progression: 75,
    budget: "2.4M€",
    dateDebut: "15 Jan 2024",
    dateFin: "30 Mai 2024",
    responsable: "Jean Dupont",
    equipe: 12,
    description: "Construction d'une résidence de 45 logements avec espaces verts",
    alertes: ["Retard livraison béton", "Météo défavorable prévue"],
    taches: [
      { nom: "Fondations", progres: 100, statut: "terminé" },
      { nom: "Gros œuvre", progres: 85, statut: "en-cours" },
      { nom: "Second œuvre", progres: 45, statut: "en-cours" },
      { nom: "Finitions", progres: 0, statut: "en-attente" }
    ],
    materiaux: [
      { nom: "Béton", quantite: "120m³", livraison: "Demain" },
      { nom: "Briques", quantite: "5000 unités", livraison: "Vendredi" },
      { nom: "Acier", quantite: "2.5 tonnes", livraison: "Lundi" }
    ]
  },
  { 
    id: 2, 
    nom: "Centre Commercial Étoile", 
    lieu: "Lyon Centre",
    client: "Groupe Retail France",
    statut: "En retard",
    progression: 45,
    budget: "8.7M€",
    dateDebut: "01 Nov 2023",
    dateFin: "15 Jun 2024",
    responsable: "Marie Martin",
    equipe: 28,
    description: "Rénovation complète d'un centre commercial de 15000m²",
    alertes: ["Dépassement budget prévu", "Problème technique électricité"],
    taches: [
      { nom: "Démolition", progres: 100, statut: "terminé" },
      { nom: "Structure", progres: 75, statut: "en-cours" },
      { nom: "Électricité", progres: 30, statut: "en-retard" },
      { nom: "Aménagement", progres: 0, statut: "en-attente" }
    ],
    materiaux: [
      { nom: "Câbles électriques", quantite: "2km", livraison: "En retard" },
      { nom: "Carrelage", quantite: "800m²", livraison: "Semaine prochaine" },
      { nom: "Peinture", quantite: "500L", livraison: "Disponible" }
    ]
  },
  { 
    id: 3, 
    nom: "Villa Moderne Cannes", 
    lieu: "Cannes",
    client: "M. et Mme Dubois",
    statut: "Terminé",
    progression: 100,
    budget: "1.8M€",
    dateDebut: "05 Fév 2024",
    dateFin: "28 Avr 2024",
    responsable: "Pierre Leroy",
    equipe: 8,
    description: "Construction d'une villa contemporaine avec piscine",
    alertes: [],
    taches: [
      { nom: "Terrassement", progres: 100, statut: "terminé" },
      { nom: "Construction", progres: 100, statut: "terminé" },
      { nom: "Piscine", progres: 100, statut: "terminé" },
      { nom: "Livraison", progres: 100, statut: "terminé" }
    ],
    materiaux: [
      { nom: "Tous matériaux", quantite: "Complet", livraison: "Terminé" }
    ]
  }
];

export default function ChantiersPage() {
  const [selected, setSelected] = useState(null);
  const { hideNavbar, showNavbar } = useNavbar();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("tous");
  const [sortBy, setSortBy] = useState("nom");
  const [sortOrder, setSortOrder] = useState("asc");

  // Filtrage et tri des chantiers
  const filteredAndSortedChantiers = useMemo(() => {
    let filtered = chantiers.filter(chantier => {
      const matchesSearch = chantier.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           chantier.lieu.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           chantier.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           chantier.responsable.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === "tous" || chantier.statut.toLowerCase() === statusFilter.toLowerCase();
      
      return matchesSearch && matchesStatus;
    });

    // Tri
    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch(sortBy) {
        case "nom":
          aValue = a.nom.toLowerCase();
          bValue = b.nom.toLowerCase();
          break;
        case "progression":
          aValue = a.progression;
          bValue = b.progression;
          break;
        case "budget":
          aValue = parseFloat(a.budget.replace(/[M€,]/g, ''));
          bValue = parseFloat(b.budget.replace(/[M€,]/g, ''));
          break;
        case "dateDebut":
          aValue = new Date(a.dateDebut.split(' ').reverse().join('-'));
          bValue = new Date(b.dateDebut.split(' ').reverse().join('-'));
          break;
        default:
          return 0;
      }
      
      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [searchTerm, statusFilter, sortBy, sortOrder]);

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("tous");
    setSortBy("nom");
    setSortOrder("asc");
  };

  const getStatutColor = (statut) => {
    switch(statut) {
      case "En cours": return "primary";
      case "En retard": return "error";
      case "Terminé": return "success";
      default: return "default";
    }
  };

  const getProgressColor = (progression) => {
    if (progression >= 80) return "#4caf50";
    if (progression >= 50) return "#ff9800";
    return "#f44336";
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4, pt: 12 }}>
      {/* Header */}
      <Box mb={4}>
        <Typography variant="h4" fontWeight={700} color="primary" gutterBottom>
          Gestion des Chantiers
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Suivez l'avancement de tous vos projets de construction
        </Typography>
      </Box>

      {/* Barre de recherche et filtres */}
      <Card elevation={1} sx={{ mb: 4 }}>
        <CardContent>
          <Grid container spacing={3} alignItems="center">
            {/* Recherche */}
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                placeholder="Rechercher un chantier..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search sx={{ color: "text.secondary" }} />
                    </InputAdornment>
                  ),
                  endAdornment: searchTerm && (
                    <InputAdornment position="end">
                      <IconButton size="small" onClick={() => setSearchTerm("")}>
                        <Clear sx={{ fontSize: 18 }} />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 3
                  }
                }}
              />
            </Grid>

            {/* Filtre par statut */}
            <Grid item xs={12} md={2}>
              <FormControl fullWidth>
                <InputLabel>Statut</InputLabel>
                <Select
                  value={statusFilter}
                  label="Statut"
                  onChange={(e) => setStatusFilter(e.target.value)}
                  sx={{ borderRadius: 3 }}
                >
                  <MenuItem value="tous">Tous</MenuItem>
                  <MenuItem value="en cours">En cours</MenuItem>
                  <MenuItem value="en retard">En retard</MenuItem>
                  <MenuItem value="terminé">Terminé</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Tri */}
            <Grid item xs={12} md={2}>
              <FormControl fullWidth>
                <InputLabel>Trier par</InputLabel>
                <Select
                  value={sortBy}
                  label="Trier par"
                  onChange={(e) => setSortBy(e.target.value)}
                  sx={{ borderRadius: 3 }}
                >
                  <MenuItem value="nom">Nom</MenuItem>
                  <MenuItem value="progression">Progression</MenuItem>
                  <MenuItem value="budget">Budget</MenuItem>
                  <MenuItem value="dateDebut">Date début</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Ordre du tri */}
            <Grid item xs={12} md={2}>
              <ButtonGroup fullWidth variant="outlined">
                <Button
                  onClick={() => setSortOrder("asc")}
                  variant={sortOrder === "asc" ? "contained" : "outlined"}
                  sx={{ borderRadius: "12px 0 0 12px" }}
                >
                  A→Z
                </Button>
                <Button
                  onClick={() => setSortOrder("desc")}
                  variant={sortOrder === "desc" ? "contained" : "outlined"}
                  sx={{ borderRadius: "0 12px 12px 0" }}
                >
                  Z→A
                </Button>
              </ButtonGroup>
            </Grid>

            {/* Effacer les filtres */}
            <Grid item xs={12} md={2}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<Clear />}
                onClick={clearFilters}
                sx={{ 
                  borderRadius: 3,
                  color: "text.secondary",
                  borderColor: "rgba(0,0,0,0.2)"
                }}
              >
                Effacer
              </Button>
            </Grid>
          </Grid>

          {/* Résultats */}
          <Box mt={2}>
            <Typography variant="body2" color="text.secondary">
              <strong>{filteredAndSortedChantiers.length}</strong> chantier(s) trouvé(s)
              {searchTerm && (
                <> pour <strong>"{searchTerm}"</strong></>
              )}
              {statusFilter !== "tous" && (
                <> • Statut: <strong>{statusFilter}</strong></>
              )}
            </Typography>
          </Box>
        </CardContent>
      </Card>

      {/* Liste des chantiers */}
      <Grid container spacing={3}>
        {filteredAndSortedChantiers.length > 0 ? (
          filteredAndSortedChantiers.map((chantier) => (
            <Grid item xs={12} md={6} lg={4} key={chantier.id}>
              <Card 
                elevation={2}
                sx={{ 
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: 4
                  }
                }} 
                onClick={() => {
                  setSelected(chantier);
                  hideNavbar();
                }}
              >
                <CardContent>
                  {/* Header */}
                  <Box display="flex" justifyContent="space-between" alignItems="start" mb={2}>
                    <Box>
                      <Typography variant="h6" fontWeight={700} color="primary" mb={1}>
                        {chantier.nom}
                      </Typography>
                      <Box display="flex" alignItems="center" gap={1} mb={1}>
                        <LocationOn sx={{ fontSize: 16, color: "text.secondary" }} />
                        <Typography variant="body2" color="text.secondary">
                          {chantier.lieu}
                        </Typography>
                      </Box>
                    </Box>
                    <Chip 
                      label={chantier.statut}
                      color={getStatutColor(chantier.statut)}
                      size="small"
                      sx={{ fontWeight: 600 }}
                    />
                  </Box>

                  {/* Client et responsable */}
                  <Box mb={2}>
                    <Typography variant="body2" color="text.secondary" mb={0.5}>
                      <strong>Client:</strong> {chantier.client}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Responsable:</strong> {chantier.responsable}
                    </Typography>
                  </Box>

                  {/* Progression */}
                  <Box mb={2}>
                    <Box display="flex" justifyContent="space-between" mb={1}>
                      <Typography variant="body2" fontWeight={600}>
                        Progression
                      </Typography>
                      <Typography variant="body2" fontWeight={600}>
                        {chantier.progression}%
                      </Typography>
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={chantier.progression}
                      sx={{
                        height: 8,
                        borderRadius: 4,
                        backgroundColor: "rgba(0,0,0,0.1)",
                        "& .MuiLinearProgress-bar": {
                          backgroundColor: getProgressColor(chantier.progression),
                          borderRadius: 4
                        }
                      }}
                    />
                  </Box>

                  {/* Informations supplémentaires */}
                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Box display="flex" alignItems="center" gap={1}>
                      <People sx={{ fontSize: 16, color: "text.secondary" }} />
                      <Typography variant="body2" color="text.secondary">
                        {chantier.equipe} personnes
                      </Typography>
                    </Box>
                    <Typography variant="body2" fontWeight={600} color="primary">
                      {chantier.budget}
                    </Typography>
                  </Box>

                  {/* Panel de recherche rapide */}
                  <Box sx={{ mt: 2, p: 1.5, backgroundColor: "rgba(50, 61, 130, 0.03)", borderRadius: 2 }}>
                    <Typography variant="caption" fontWeight={600} color="primary" display="block" mb={1}>
                      🔍 Recherche rapide
                    </Typography>
                    <Box display="flex" gap={1} flexWrap="wrap">
                      <Chip label="Tâches" size="small" variant="outlined" sx={{ fontSize: "0.7rem" }} />
                      <Chip label="Matériaux" size="small" variant="outlined" sx={{ fontSize: "0.7rem" }} />
                      <Chip label="Alertes" size="small" variant="outlined" sx={{ fontSize: "0.7rem" }} />
                    </Box>
                  </Box>

                  {/* Alertes */}
                  {chantier.alertes.length > 0 && (
                    <Box mt={2}>
                      <Chip 
                        icon={<Warning sx={{ fontSize: 16 }} />}
                        label={`${chantier.alertes.length} alerte(s)`}
                        color="warning"
                        size="small"
                        variant="outlined"
                      />
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Card elevation={1}>
              <CardContent sx={{ textAlign: "center", py: 6 }}>
                <Search sx={{ fontSize: 48, color: "text.disabled", mb: 2 }} />
                <Typography variant="h6" color="text.secondary" mb={1}>
                  Aucun chantier trouvé
                </Typography>
                <Typography variant="body2" color="text.disabled" mb={3}>
                  Essayez de modifier vos critères de recherche
                </Typography>
                <Button variant="outlined" onClick={clearFilters}>
                  Effacer les filtres
                </Button>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>

      {/* Panel de détails */}
      <Drawer 
        anchor="right" 
        open={!!selected} 
        onClose={() => {
          setSelected(null);
          showNavbar();
        }}
        PaperProps={{
          sx: { 
            width: { xs: "100%", md: 480 },
            background: "rgba(255, 255, 255, 0.98)"
          }
        }}
      >
        {selected && (
          <Box p={3}>
            {/* Header */}
            <Box display="flex" justifyContent="space-between" alignItems="start" mb={3}>
              <Box>
                <Typography variant="h5" fontWeight={700} color="primary" mb={1}>
                  {selected.nom}
                </Typography>
                <Chip 
                  label={selected.statut}
                  color={getStatutColor(selected.statut)}
                  sx={{ fontWeight: 600 }}
                />
              </Box>
              <IconButton onClick={() => {
                setSelected(null);
                showNavbar();
              }}>
                <Close />
              </IconButton>
            </Box>

            {/* Informations générales */}
            <Card elevation={1} sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" fontWeight={600} mb={2}>
                  Informations Générales
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">Client</Typography>
                    <Typography variant="body1" fontWeight={600}>{selected.client}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">Budget</Typography>
                    <Typography variant="body1" fontWeight={600}>{selected.budget}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">Début</Typography>
                    <Typography variant="body1">{selected.dateDebut}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">Fin prévue</Typography>
                    <Typography variant="body1">{selected.dateFin}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2" color="text.secondary">Description</Typography>
                    <Typography variant="body1">{selected.description}</Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            {/* Progression des tâches */}
            <Card elevation={1} sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" fontWeight={600} mb={2}>
                  Avancement des Tâches
                </Typography>
                <List disablePadding>
                  {selected.taches.map((tache, index) => (
                    <ListItem key={index} disablePadding sx={{ mb: 1 }}>
                      <Box width="100%">
                        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                          <Typography variant="body2" fontWeight={600}>
                            {tache.nom}
                          </Typography>
                          <Typography variant="body2">
                            {tache.progres}%
                          </Typography>
                        </Box>
                        <LinearProgress 
                          variant="determinate" 
                          value={tache.progres}
                          color={
                            tache.statut === "terminé" ? "success" :
                            tache.statut === "en-retard" ? "error" : "primary"
                          }
                          sx={{ height: 6, borderRadius: 3 }}
                        />
                      </Box>
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>

            {/* Matériaux */}
            <Card elevation={1} sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" fontWeight={600} mb={2}>
                  Matériaux et Livraisons
                </Typography>
                <List disablePadding>
                  {selected.materiaux.map((materiau, index) => (
                    <ListItem key={index} disablePadding>
                      <ListItemIcon>
                        <Build sx={{ color: "primary.main" }} />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography variant="body2" fontWeight={600}>
                            {materiau.nom} - {materiau.quantite}
                          </Typography>
                        }
                        secondary={
                          <Typography variant="caption" color="text.secondary">
                            Livraison: {materiau.livraison}
                          </Typography>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>

            {/* Alertes */}
            {selected.alertes.length > 0 && (
              <Card elevation={1}>
                <CardContent>
                  <Typography variant="h6" fontWeight={600} mb={2} color="warning.main">
                    Alertes Actives
                  </Typography>
                  <List disablePadding>
                    {selected.alertes.map((alerte, index) => (
                      <ListItem key={index} disablePadding>
                        <ListItemIcon>
                          <Warning sx={{ color: "warning.main" }} />
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Typography variant="body2" color="warning.main">
                              {alerte}
                            </Typography>
                          }
                        />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            )}
          </Box>
        )}
      </Drawer>
    </Container>
  );
} 