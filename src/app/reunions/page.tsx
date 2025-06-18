"use client";
import { useState, useMemo } from "react";
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
  Divider,
  IconButton,
  AvatarGroup,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ButtonGroup,
  Collapse
} from "@mui/material";
import { 
  Schedule, 
  People, 
  CheckCircle, 
  Close,
  CalendarToday,
  AccessTime,
  Assignment,
  PlayArrow,
  Done,
  Warning,
  Person,
  Search,
  Clear,
  FilterList,
  Groups,
  ExpandMore,
  Pending,
  Add
} from "@mui/icons-material";

const reunions = [
  { 
    id: 1, 
    titre: "Point Hebdomadaire Équipe", 
    date: "2024-03-15",
    heure: "14:00",
    duree: "1h30",
    statut: "Terminée",
    participants: ["Jean Dupont", "Marie Martin", "Pierre Leroy", "Sophie Bernard"],
    lieu: "Salle de conférence A",
    organisateur: "Jean Dupont",
    description: "Réunion hebdomadaire pour faire le point sur l'avancement des projets",
    ordreJour: [
      "Avancement chantier Lyon-Centre",
      "Problèmes techniques Chantier A", 
      "Planning livraisons semaine prochaine",
      "Budget Q1 - Points d'attention"
    ],
    decisions: [
      "Reporter livraison béton au vendredi",
      "Engager un électricien supplémentaire pour Lyon-Centre",
      "Réorganiser planning équipe B"
    ],
    actions: [
      { action: "Contacter fournisseur béton", responsable: "Marie Martin", echeance: "16/03/2024", statut: "en-cours" },
      { action: "Recruter électricien", responsable: "Pierre Leroy", echeance: "20/03/2024", statut: "en-attente" },
      { action: "Mise à jour planning", responsable: "Sophie Bernard", echeance: "17/03/2024", statut: "terminé" }
    ],
    notes: "Réunion productive. Tous les points ont été abordés. Prochaine réunion fixée au 22/03."
  },
  { 
    id: 2, 
    titre: "Réunion Client - Projet Résidence", 
    date: "2024-03-18",
    heure: "10:00",
    duree: "2h",
    statut: "Planifiée",
    participants: ["Jean Dupont", "M. Dubois (Client)", "Architecte conseil"],
    lieu: "Bureau client",
    organisateur: "Jean Dupont",
    description: "Présentation avancement et validation des modifications demandées",
    ordreJour: [
      "Présentation avancement global",
      "Validation modifications façade",
      "Discussion délais finition",
      "Points budgétaires"
    ],
    decisions: [],
    actions: [
      { action: "Préparer dossier présentation", responsable: "Jean Dupont", echeance: "18/03/2024", statut: "en-cours" }
    ],
    notes: ""
  },
  { 
    id: 3, 
    titre: "Formation Sécurité Chantier", 
    date: "2024-03-12",
    heure: "09:00",
    duree: "3h",
    statut: "Terminée",
    participants: ["Toute l'équipe chantier (15 personnes)", "Formateur sécurité"],
    lieu: "Centre de formation",
    organisateur: "Marie Martin",
    description: "Formation obligatoire sur les nouvelles normes de sécurité",
    ordreJour: [
      "Nouvelles réglementations 2024",
      "Équipements de protection",
      "Procédures d'urgence",
      "Test de validation"
    ],
    decisions: [
      "Mise à jour des procédures internes",
      "Achat nouveaux équipements de protection",
      "Formation trimestrielle obligatoire"
    ],
    actions: [
      { action: "Commander nouveaux casques", responsable: "Marie Martin", echeance: "15/03/2024", statut: "terminé" },
      { action: "Rédiger nouvelle procédure", responsable: "Pierre Leroy", echeance: "25/03/2024", statut: "en-cours" }
    ],
    notes: "Formation très appréciée. 100% de réussite au test. Certificats remis à tous les participants."
  }
];

export default function ReunionsPage() {
  const [selected, setSelected] = useState(null);
  const { hideNavbar, showNavbar } = useNavbar();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("tous");
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");

  // Filtrage et tri des réunions
  const filteredAndSortedReunions = useMemo(() => {
    const filtered = reunions.filter(reunion => {
      const matchesSearch = reunion.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           reunion.lieu.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           reunion.organisateur.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           reunion.participants.some(p => p.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesStatus = statusFilter === "tous" || reunion.statut.toLowerCase() === statusFilter.toLowerCase();
      
      return matchesSearch && matchesStatus;
    });

    // Tri
    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch(sortBy) {
        case "titre":
          aValue = a.titre.toLowerCase();
          bValue = b.titre.toLowerCase();
          break;
        case "date":
          aValue = new Date(a.date);
          bValue = new Date(b.date);
          break;
        case "participants":
          aValue = a.participants.length;
          bValue = b.participants.length;
          break;
        case "duree":
          // Convertir la durée en minutes pour le tri
          const getDureeMinutes = (duree) => {
            const hours = duree.match(/(\d+)h/) ? parseInt(duree.match(/(\d+)h/)[1]) : 0;
            const minutes = duree.match(/(\d+)min/) ? parseInt(duree.match(/(\d+)min/)[1]) : 0;
            return hours * 60 + minutes;
          };
          aValue = getDureeMinutes(a.duree);
          bValue = getDureeMinutes(b.duree);
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
    setSortBy("date");
    setSortOrder("desc");
  };

  const getStatutColor = (statut) => {
    switch(statut) {
      case "Terminée": return "success";
      case "Planifiée": return "primary";
      case "En cours": return "warning";
      case "Annulée": return "error";
      default: return "default";
    }
  };

  const getActionStatutColor = (statut) => {
    switch(statut) {
      case "terminé": return "success";
      case "en-cours": return "warning";
      case "en-attente": return "default";
      case "en-retard": return "error";
      default: return "default";
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('fr-FR', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4, pt: 12 }}>
      {/* Header */}
      <Box mb={4}>
        <Typography variant="h4" fontWeight={700} color="primary" gutterBottom>
          Gestion des Réunions
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Planification et suivi de vos réunions et décisions
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
                placeholder="Rechercher une réunion..."
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
                  <MenuItem value="planifiée">Planifiée</MenuItem>
                  <MenuItem value="en cours">En cours</MenuItem>
                  <MenuItem value="terminée">Terminée</MenuItem>
                  <MenuItem value="annulée">Annulée</MenuItem>
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
                  <MenuItem value="date">Date</MenuItem>
                  <MenuItem value="titre">Titre</MenuItem>
                  <MenuItem value="participants">Participants</MenuItem>
                  <MenuItem value="duree">Durée</MenuItem>
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
                  ↑
                </Button>
                <Button
                  onClick={() => setSortOrder("desc")}
                  variant={sortOrder === "desc" ? "contained" : "outlined"}
                  sx={{ borderRadius: "0 12px 12px 0" }}
                >
                  ↓
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
              <strong>{filteredAndSortedReunions.length}</strong> réunion(s) trouvée(s)
              {searchTerm && (
                <> pour <strong>&ldquo;{searchTerm}&rdquo;</strong></>
              )}
              {statusFilter !== "tous" && (
                <> • Statut: <strong>{statusFilter}</strong></>
              )}
            </Typography>
          </Box>
        </CardContent>
      </Card>

      {/* Liste des réunions */}
      <Grid container spacing={3}>
        {filteredAndSortedReunions.length > 0 ? (
          filteredAndSortedReunions.map((reunion) => (
            <Grid item xs={12} md={6} lg={4} key={reunion.id}>
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
                  setSelected(reunion);
                  hideNavbar();
                }}
              >
                <CardContent>
                  {/* Header */}
                  <Box display="flex" justifyContent="space-between" alignItems="start" mb={2}>
                    <Box>
                      <Typography variant="h6" fontWeight={700} color="primary" mb={1}>
                        {reunion.titre}
                      </Typography>
                      <Box display="flex" alignItems="center" gap={1} mb={1}>
                        <CalendarToday sx={{ fontSize: 16, color: "text.secondary" }} />
                        <Typography variant="body2" color="text.secondary">
                          {formatDate(reunion.date)}
                        </Typography>
                      </Box>
                    </Box>
                    <Chip 
                      label={reunion.statut}
                      color={getStatutColor(reunion.statut)}
                      size="small"
                      sx={{ fontWeight: 600 }}
                    />
                  </Box>

                  {/* Détails */}
                  <Box mb={2}>
                    <Box display="flex" alignItems="center" gap={1} mb={1}>
                      <AccessTime sx={{ fontSize: 16, color: "text.secondary" }} />
                      <Typography variant="body2" color="text.secondary">
                        {reunion.heure} ({reunion.duree})
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Organisateur:</strong> {reunion.organisateur}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Lieu:</strong> {reunion.lieu}
                    </Typography>
                  </Box>

                  {/* Participants */}
                  <Box mb={2}>
                    <Typography variant="body2" fontWeight={600} mb={1}>
                      Participants ({reunion.participants.length})
                    </Typography>
                    <AvatarGroup max={4} sx={{ justifyContent: "flex-start" }}>
                      {reunion.participants.map((participant, index) => (
                        <Avatar 
                          key={index}
                          sx={{ 
                            width: 32, 
                            height: 32,
                            fontSize: "0.8rem",
                            background: `hsl(${index * 60}, 60%, 70%)`
                          }}
                        >
                          {participant.split(' ').map(n => n[0]).join('').substring(0, 2)}
                        </Avatar>
                      ))}
                    </AvatarGroup>
                  </Box>

                  {/* Panel de recherche rapide */}
                  <Box sx={{ mt: 2, p: 1.5, backgroundColor: "rgba(50, 61, 130, 0.03)", borderRadius: 2, mb: 2 }}>
                    <Typography variant="caption" fontWeight={600} color="primary" display="block" mb={1}>
                      🔍 Recherche rapide
                    </Typography>
                    <Box display="flex" gap={1} flexWrap="wrap">
                      <Chip label="Agenda" size="small" variant="outlined" sx={{ fontSize: "0.7rem" }} />
                      <Chip label="Participants" size="small" variant="outlined" sx={{ fontSize: "0.7rem" }} />
                      <Chip label="Actions" size="small" variant="outlined" sx={{ fontSize: "0.7rem" }} />
                    </Box>
                  </Box>

                  {/* Actions en cours */}
                  {reunion.actions && reunion.actions.length > 0 && (
                    <Box>
                      <Typography variant="body2" fontWeight={600} mb={1}>
                        Actions: {reunion.actions.filter(a => a.statut === "terminé").length}/{reunion.actions.length} terminées
                      </Typography>
                      <Box display="flex" gap={1} flexWrap="wrap">
                        {reunion.actions.slice(0, 2).map((action, index) => (
                          <Chip
                            key={index}
                            label={action.statut}
                            color={getActionStatutColor(action.statut)}
                            size="small"
                            sx={{ fontSize: "0.7rem" }}
                          />
                        ))}
                        {reunion.actions.length > 2 && (
                          <Chip
                            label={`+${reunion.actions.length - 2}`}
                            size="small"
                            variant="outlined"
                            sx={{ fontSize: "0.7rem" }}
                          />
                        )}
                      </Box>
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
                  Aucune réunion trouvée
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

      {/* Panel de détails de la réunion */}
      <Drawer 
        anchor="right" 
        open={!!selected} 
        onClose={() => {
          setSelected(null);
          showNavbar();
        }}
        PaperProps={{
          sx: { 
            width: { xs: "100%", md: 580 },
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
                  {selected.titre}
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
                    <Typography variant="body2" color="text.secondary">Date</Typography>
                    <Typography variant="body1" fontWeight={600}>{formatDate(selected.date)}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">Heure</Typography>
                    <Typography variant="body1" fontWeight={600}>{selected.heure}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">Durée</Typography>
                    <Typography variant="body1">{selected.duree}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">Lieu</Typography>
                    <Typography variant="body1">{selected.lieu}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2" color="text.secondary">Organisateur</Typography>
                    <Typography variant="body1">{selected.organisateur}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2" color="text.secondary">Description</Typography>
                    <Typography variant="body1">{selected.description}</Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            {/* Participants */}
            <Card elevation={1} sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" fontWeight={600} mb={2}>
                  Participants ({selected.participants.length})
                </Typography>
                <List disablePadding>
                  {selected.participants.map((participant, index) => (
                    <ListItem key={index} disablePadding>
                      <ListItemIcon>
                        <Avatar 
                          sx={{ 
                            width: 32, 
                            height: 32,
                            fontSize: "0.8rem",
                            background: `hsl(${index * 60}, 60%, 70%)`
                          }}
                        >
                          {participant.split(' ').map(n => n[0]).join('').substring(0, 2)}
                        </Avatar>
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography variant="body2" fontWeight={600}>
                            {participant}
                          </Typography>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>

            {/* Ordre du jour */}
            <Card elevation={1} sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" fontWeight={600} mb={2}>
                  Ordre du Jour
                </Typography>
                <List disablePadding>
                  {selected.ordreJour.map((point, index) => (
                    <ListItem key={index} disablePadding>
                      <ListItemIcon>
                        <Typography variant="body2" fontWeight={600} color="primary">
                          {index + 1}.
                        </Typography>
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography variant="body2">
                            {point}
                          </Typography>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>

            {/* Décisions prises */}
            {selected.decisions && selected.decisions.length > 0 && (
              <Card elevation={1} sx={{ mb: 3 }}>
                <CardContent>
                  <Typography variant="h6" fontWeight={600} mb={2} color="success.main">
                    Décisions Prises
                  </Typography>
                  <List disablePadding>
                    {selected.decisions.map((decision, index) => (
                      <ListItem key={index} disablePadding>
                        <ListItemIcon>
                          <CheckCircle sx={{ color: "success.main", fontSize: 20 }} />
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Typography variant="body2">
                              {decision}
                            </Typography>
                          }
                        />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            )}

            {/* Actions à suivre */}
            {selected.actions && selected.actions.length > 0 && (
              <Card elevation={1} sx={{ mb: 3 }}>
                <CardContent>
                  <Typography variant="h6" fontWeight={600} mb={2}>
                    Actions à Suivre
                  </Typography>
                  <List disablePadding>
                    {selected.actions.map((action, index) => (
                      <ListItem key={index} disablePadding sx={{ mb: 1 }}>
                        <Box width="100%">
                          <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                            <Typography variant="body2" fontWeight={600}>
                              {action.action}
                            </Typography>
                            <Chip
                              label={action.statut}
                              color={getActionStatutColor(action.statut)}
                              size="small"
                              sx={{ fontSize: "0.7rem" }}
                            />
                          </Box>
                          <Box display="flex" justifyContent="space-between">
                            <Typography variant="caption" color="text.secondary">
                              Responsable: {action.responsable}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              Échéance: {action.echeance}
                            </Typography>
                          </Box>
                        </Box>
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            )}

            {/* Notes */}
            {selected.notes && (
              <Card elevation={1}>
                <CardContent>
                  <Typography variant="h6" fontWeight={600} mb={2}>
                    Notes de Réunion
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {selected.notes}
                  </Typography>
                </CardContent>
              </Card>
            )}
          </Box>
        )}
      </Drawer>
    </Container>
  );
} 