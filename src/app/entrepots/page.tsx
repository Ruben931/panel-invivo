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
  List, 
  ListItem, 
  ListItemText, 
  Box,
  Container,
  Chip,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  LinearProgress,
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
  Inventory, 
  Warning, 
  CheckCircle, 
  Close,
  LocationOn,
  TrendingDown,
  TrendingUp,
  Build,
  LocalShipping,
  Search,
  Clear,
  FilterList
} from "@mui/icons-material";

const entrepots = [
  { 
    id: 1, 
    nom: "Entrepôt Nord", 
    adresse: "Zone Industrielle Nord, Roissy",
    responsable: "Marc Durand",
    superficie: "2500m²",
    capacite: "85%",
    alertes: 3,
    stock: [
      { nom: "Béton", quantite: 45, unite: "m³", min: 20, max: 100, statut: "ok", derniereMaj: "Hier" },
      { nom: "Ciment", quantite: 8, unite: "tonnes", min: 15, max: 50, statut: "faible", derniereMaj: "Aujourd'hui" },
      { nom: "Briques", quantite: 2850, unite: "unités", min: 1000, max: 5000, statut: "ok", derniereMaj: "Il y a 2 jours" },
      { nom: "Acier", quantite: 3.2, unite: "tonnes", min: 2, max: 10, statut: "ok", derniereMaj: "Hier" },
      { nom: "Peinture", quantite: 125, unite: "litres", min: 50, max: 300, statut: "ok", derniereMaj: "Il y a 3 jours" },
      { nom: "Carrelage", quantite: 180, unite: "m²", min: 200, max: 800, statut: "faible", derniereMaj: "Aujourd'hui" }
    ]
  },
  { 
    id: 2, 
    nom: "Entrepôt Sud", 
    adresse: "Parc Logistique Sud, Lyon",
    responsable: "Sophie Bernard",
    superficie: "3200m²", 
    capacite: "92%",
    alertes: 1,
    stock: [
      { nom: "Bois", quantite: 156, unite: "m³", min: 50, max: 200, statut: "ok", derniereMaj: "Il y a 1 jour" },
      { nom: "Tuiles", quantite: 1250, unite: "unités", min: 500, max: 2000, statut: "ok", derniereMaj: "Il y a 2 jours" },
      { nom: "Isolation", quantite: 85, unite: "rouleaux", min: 30, max: 120, statut: "ok", derniereMaj: "Hier" },
      { nom: "Plâtre", quantite: 12, unite: "sacs", min: 20, max: 80, statut: "faible", derniereMaj: "Aujourd'hui" },
      { nom: "Électricité", quantite: 2.8, unite: "km", min: 1, max: 5, statut: "ok", derniereMaj: "Il y a 3 jours" },
      { nom: "Sanitaires", quantite: 45, unite: "unités", min: 10, max: 100, statut: "ok", derniereMaj: "Hier" }
    ]
  },
  { 
    id: 3, 
    nom: "Entrepôt Ouest", 
    adresse: "Zone Artisanale Ouest, Nantes",
    responsable: "Thomas Petit",
    superficie: "1800m²",
    capacite: "67%",
    alertes: 0,
    stock: [
      { nom: "Fenêtres", quantite: 28, unite: "unités", min: 10, max: 50, statut: "ok", derniereMaj: "Il y a 1 jour" },
      { nom: "Portes", quantite: 15, unite: "unités", min: 5, max: 30, statut: "ok", derniereMaj: "Il y a 2 jours" },
      { nom: "Parquet", quantite: 245, unite: "m²", min: 100, max: 400, statut: "ok", derniereMaj: "Hier" },
      { nom: "Robinetterie", quantite: 85, unite: "unités", min: 20, max: 150, statut: "ok", derniereMaj: "Il y a 1 jour" },
      { nom: "Chauffage", quantite: 12, unite: "unités", min: 5, max: 25, statut: "ok", derniereMaj: "Il y a 4 jours" }
    ]
  }
];

export default function EntrepotsPage() {
  const [selected, setSelected] = useState(null);
  const { hideNavbar, showNavbar } = useNavbar();
  const [searchTerm, setSearchTerm] = useState("");
  const [alertFilter, setAlertFilter] = useState("tous");
  const [capacityFilter, setCapacityFilter] = useState("tous");
  const [sortBy, setSortBy] = useState("nom");
  const [sortOrder, setSortOrder] = useState("asc");

  // Filtrage et tri des entrepôts
  const filteredAndSortedEntrepots = useMemo(() => {
    let filtered = entrepots.filter(entrepot => {
      const matchesSearch = entrepot.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           entrepot.adresse.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           entrepot.responsable.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesAlert = alertFilter === "tous" || 
                          (alertFilter === "avec" && entrepot.alertes > 0) ||
                          (alertFilter === "sans" && entrepot.alertes === 0);
      
      const capacityPercent = parseInt(entrepot.capacite);
      const matchesCapacity = capacityFilter === "tous" ||
                             (capacityFilter === "faible" && capacityPercent < 70) ||
                             (capacityFilter === "moyenne" && capacityPercent >= 70 && capacityPercent < 90) ||
                             (capacityFilter === "elevee" && capacityPercent >= 90);
      
      return matchesSearch && matchesAlert && matchesCapacity;
    });

    // Tri
    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch(sortBy) {
        case "nom":
          aValue = a.nom.toLowerCase();
          bValue = b.nom.toLowerCase();
          break;
        case "capacite":
          aValue = parseInt(a.capacite);
          bValue = parseInt(b.capacite);
          break;
        case "alertes":
          aValue = a.alertes;
          bValue = b.alertes;
          break;
        case "superficie":
          aValue = parseInt(a.superficie.replace(/[m²]/g, ''));
          bValue = parseInt(b.superficie.replace(/[m²]/g, ''));
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
  }, [searchTerm, alertFilter, capacityFilter, sortBy, sortOrder]);

  const clearFilters = () => {
    setSearchTerm("");
    setAlertFilter("tous");
    setCapacityFilter("tous");
    setSortBy("nom");
    setSortOrder("asc");
  };

  const getStatutColor = (statut) => {
    switch(statut) {
      case "ok": return "success";
      case "faible": return "warning"; 
      case "critique": return "error";
      default: return "default";
    }
  };

  const getCapaciteColor = (capacite) => {
    const percent = parseInt(capacite);
    if (percent >= 90) return "#f44336";
    if (percent >= 75) return "#ff9800";
    return "#4caf50";
  };

  const getStockProgress = (quantite, min, max) => {
    return ((quantite - min) / (max - min)) * 100;
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4, pt: 12 }}>
      {/* Header */}
      <Box mb={4}>
        <Typography variant="h4" fontWeight={700} color="primary" gutterBottom>
          Gestion des Entrepôts
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Suivi en temps réel de vos stocks et inventaires
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
                placeholder="Rechercher un entrepôt..."
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

            {/* Filtre par alertes */}
            <Grid item xs={12} md={2}>
              <FormControl fullWidth>
                <InputLabel>Alertes</InputLabel>
                <Select
                  value={alertFilter}
                  label="Alertes"
                  onChange={(e) => setAlertFilter(e.target.value)}
                  sx={{ borderRadius: 3 }}
                >
                  <MenuItem value="tous">Tous</MenuItem>
                  <MenuItem value="avec">Avec alertes</MenuItem>
                  <MenuItem value="sans">Sans alertes</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Filtre par capacité */}
            <Grid item xs={12} md={2}>
              <FormControl fullWidth>
                <InputLabel>Capacité</InputLabel>
                <Select
                  value={capacityFilter}
                  label="Capacité"
                  onChange={(e) => setCapacityFilter(e.target.value)}
                  sx={{ borderRadius: 3 }}
                >
                  <MenuItem value="tous">Tous</MenuItem>
                  <MenuItem value="faible">&lt; 70%</MenuItem>
                  <MenuItem value="moyenne">70-90%</MenuItem>
                  <MenuItem value="elevee">&gt; 90%</MenuItem>
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
                  <MenuItem value="capacite">Capacité</MenuItem>
                  <MenuItem value="alertes">Alertes</MenuItem>
                  <MenuItem value="superficie">Superficie</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Ordre du tri */}
            <Grid item xs={12} md={1}>
              <ButtonGroup fullWidth variant="outlined">
                <Button
                  onClick={() => setSortOrder("asc")}
                  variant={sortOrder === "asc" ? "contained" : "outlined"}
                  sx={{ borderRadius: "12px 0 0 12px", minWidth: "45px" }}
                >
                  ↑
                </Button>
                <Button
                  onClick={() => setSortOrder("desc")}
                  variant={sortOrder === "desc" ? "contained" : "outlined"}
                  sx={{ borderRadius: "0 12px 12px 0", minWidth: "45px" }}
                >
                  ↓
                </Button>
              </ButtonGroup>
            </Grid>

            {/* Effacer les filtres */}
            <Grid item xs={12} md={1}>
              <Button
                fullWidth
                variant="outlined"
                onClick={clearFilters}
                sx={{ 
                  borderRadius: 3,
                  color: "text.secondary",
                  borderColor: "rgba(0,0,0,0.2)",
                  minWidth: "auto",
                  px: 1
                }}
              >
                <Clear />
              </Button>
            </Grid>
          </Grid>

          {/* Résultats */}
          <Box mt={2}>
            <Typography variant="body2" color="text.secondary">
              <strong>{filteredAndSortedEntrepots.length}</strong> entrepôt(s) trouvé(s)
              {searchTerm && (
                <> pour <strong>"{searchTerm}"</strong></>
              )}
              {alertFilter !== "tous" && (
                <> • <strong>{alertFilter === "avec" ? "Avec alertes" : "Sans alertes"}</strong></>
              )}
              {capacityFilter !== "tous" && (
                <> • Capacité: <strong>{
                  capacityFilter === "faible" ? "< 70%" :
                  capacityFilter === "moyenne" ? "70-90%" : "> 90%"
                }</strong></>
              )}
            </Typography>
          </Box>
        </CardContent>
      </Card>

      {/* Liste des entrepôts */}
      <Grid container spacing={3}>
        {filteredAndSortedEntrepots.length > 0 ? (
          filteredAndSortedEntrepots.map((entrepot) => (
            <Grid item xs={12} md={6} lg={4} key={entrepot.id}>
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
                  setSelected(entrepot);
                  hideNavbar();
                }}
              >
                <CardContent>
                  {/* Header */}
                  <Box display="flex" justifyContent="space-between" alignItems="start" mb={2}>
                    <Box>
                      <Typography variant="h6" fontWeight={700} color="primary" mb={1}>
                        {entrepot.nom}
                      </Typography>
                      <Box display="flex" alignItems="center" gap={1} mb={1}>
                        <LocationOn sx={{ fontSize: 16, color: "text.secondary" }} />
                        <Typography variant="body2" color="text.secondary">
                          {entrepot.adresse}
                        </Typography>
                      </Box>
                    </Box>
                    {entrepot.alertes > 0 && (
                      <Chip 
                        label={`${entrepot.alertes} alertes`}
                        color="warning"
                        size="small"
                        sx={{ fontWeight: 600 }}
                      />
                    )}
                  </Box>

                  {/* Responsable */}
                  <Box mb={2}>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Responsable:</strong> {entrepot.responsable}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Superficie:</strong> {entrepot.superficie}
                    </Typography>
                  </Box>

                  {/* Capacité */}
                  <Box mb={2}>
                    <Box display="flex" justifyContent="space-between" mb={1}>
                      <Typography variant="body2" fontWeight={600}>
                        Capacité utilisée
                      </Typography>
                      <Typography variant="body2" fontWeight={600}>
                        {entrepot.capacite}
                      </Typography>
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={parseInt(entrepot.capacite)}
                      sx={{
                        height: 8,
                        borderRadius: 4,
                        backgroundColor: "rgba(0,0,0,0.1)",
                        "& .MuiLinearProgress-bar": {
                          backgroundColor: getCapaciteColor(entrepot.capacite),
                          borderRadius: 4
                        }
                      }}
                    />
                  </Box>

                  {/* Stock info */}
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Box display="flex" alignItems="center" gap={1}>
                      <Inventory sx={{ fontSize: 16, color: "text.secondary" }} />
                      <Typography variant="body2" color="text.secondary">
                        {entrepot.stock.length} articles
                      </Typography>
                    </Box>
                    <Typography variant="body2" fontWeight={600} color="primary">
                      Voir le stock →
                    </Typography>
                  </Box>
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
                  Aucun entrepôt trouvé
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

      {/* Panel de détails du stock */}
      <Drawer 
        anchor="right" 
        open={!!selected} 
        onClose={() => {
          setSelected(null);
          showNavbar();
        }}
        PaperProps={{
          sx: { 
            width: { xs: "100%", md: 600 },
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
                <Typography variant="body2" color="text.secondary">
                  {selected.adresse}
                </Typography>
              </Box>
              <IconButton onClick={() => {
                setSelected(null);
                showNavbar();
              }}>
                <Close />
              </IconButton>
            </Box>



            {/* Stock détaillé */}
            <Card elevation={1}>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <Typography variant="h6" fontWeight={600}>
                    Stock Détaillé
                  </Typography>
                  <Button 
                    variant="contained" 
                    size="small"
                    onClick={() => {
                      // Navigation locale - reste dans l'application
                      console.log('Affichage du stock complet pour l\'entrepôt:', selected.id);
                      // Ici vous pouvez ajouter une logique pour afficher plus de détails
                      // ou créer une page de stock locale plus tard
                    }}
                    sx={{ borderRadius: 2 }}
                  >
                    Voir Stock Complet
                  </Button>
                </Box>
                <TableContainer component={Paper} elevation={0} sx={{ border: "1px solid rgba(0,0,0,0.1)" }}>
                  <Table size="small">
                    <TableHead>
                      <TableRow sx={{ backgroundColor: "rgba(50, 61, 130, 0.05)" }}>
                        <TableCell><strong>Article</strong></TableCell>
                        <TableCell align="center"><strong>Quantité</strong></TableCell>
                        <TableCell align="center"><strong>Statut</strong></TableCell>
                        <TableCell align="center"><strong>MAJ</strong></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {selected.stock.map((item, index) => (
                        <TableRow key={index} sx={{ "&:hover": { backgroundColor: "rgba(0,0,0,0.02)" } }}>
                          <TableCell>
                            <Box>
                              <Typography variant="body2" fontWeight={600}>
                                {item.nom}
                              </Typography>
                              <Box mt={1}>
                                <LinearProgress
                                  variant="determinate"
                                  value={Math.max(0, Math.min(100, getStockProgress(item.quantite, item.min, item.max)))}
                                  color={getStatutColor(item.statut)}
                                  sx={{ height: 4, borderRadius: 2 }}
                                />
                              </Box>
                            </Box>
                          </TableCell>
                          <TableCell align="center">
                            <Typography variant="body2" fontWeight={600}>
                              {item.quantite} {item.unite}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              Min: {item.min} / Max: {item.max}
                            </Typography>
                          </TableCell>
                          <TableCell align="center">
                            <Chip
                              label={item.statut}
                              color={getStatutColor(item.statut)}
                              size="small"
                              sx={{ fontWeight: 600 }}
                            />
                          </TableCell>
                          <TableCell align="center">
                            <Typography variant="caption" color="text.secondary">
                              {item.derniereMaj}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>

            {/* Alertes de stock */}
            {selected.alertes > 0 && (
              <Card elevation={1} sx={{ mt: 3 }}>
                <CardContent>
                  <Typography variant="h6" fontWeight={600} mb={2} color="warning.main">
                    Alertes de Stock
                  </Typography>
                  <List disablePadding>
                    {selected.stock
                      .filter(item => item.statut === "faible" || item.statut === "critique")
                      .map((item, index) => (
                        <ListItem key={index} disablePadding>
                          <ListItemText
                            primary={
                              <Box display="flex" alignItems="center" gap={1}>
                                <Warning sx={{ color: "warning.main", fontSize: 20 }} />
                                <Typography variant="body2" fontWeight={600}>
                                  {item.nom} - Stock {item.statut}
                                </Typography>
                              </Box>
                            }
                            secondary={
                              <Typography variant="caption" color="text.secondary">
                                Quantité actuelle: {item.quantite} {item.unite} (Min recommandé: {item.min})
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