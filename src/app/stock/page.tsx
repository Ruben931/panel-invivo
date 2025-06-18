"use client";
import { useState, useMemo } from "react";
import { 
  Card, 
  CardContent, 
  Typography, 
  Grid, 
  Button, 
  Box,
  Container,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  LinearProgress,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ButtonGroup,
  IconButton,
  Tabs,
  Tab
} from "@mui/material";
import { 
  Inventory, 
  Warning, 
  CheckCircle, 
  Search,
  Clear,
  FilterList,
  ViewModule,
  ViewList,
  TrendingDown,
  TrendingUp,
  LocalShipping,
  Build
} from "@mui/icons-material";

// Données complètes de stock de tous les entrepôts
const allStock = [
  // Entrepôt Nord
  { id: 1, entrepot: "Entrepôt Nord", nom: "Béton", quantite: 45, unite: "m³", min: 20, max: 100, statut: "ok", derniereMaj: "Hier", prix: "120€/m³", fournisseur: "Lafarge" },
  { id: 2, entrepot: "Entrepôt Nord", nom: "Ciment", quantite: 8, unite: "tonnes", min: 15, max: 50, statut: "faible", derniereMaj: "Aujourd'hui", prix: "85€/tonne", fournisseur: "Holcim" },
  { id: 3, entrepot: "Entrepôt Nord", nom: "Briques", quantite: 2850, unite: "unités", min: 1000, max: 5000, statut: "ok", derniereMaj: "Il y a 2 jours", prix: "0.35€/unité", fournisseur: "Wienerberger" },
  { id: 4, entrepot: "Entrepôt Nord", nom: "Acier", quantite: 3.2, unite: "tonnes", min: 2, max: 10, statut: "ok", derniereMaj: "Hier", prix: "1200€/tonne", fournisseur: "ArcelorMittal" },
  { id: 5, entrepot: "Entrepôt Nord", nom: "Peinture", quantite: 125, unite: "litres", min: 50, max: 300, statut: "ok", derniereMaj: "Il y a 3 jours", prix: "15€/L", fournisseur: "Dulux" },
  { id: 6, entrepot: "Entrepôt Nord", nom: "Carrelage", quantite: 180, unite: "m²", min: 200, max: 800, statut: "faible", derniereMaj: "Aujourd'hui", prix: "25€/m²", fournisseur: "Porcelanosa" },
  
  // Entrepôt Sud
  { id: 7, entrepot: "Entrepôt Sud", nom: "Bois", quantite: 156, unite: "m³", min: 50, max: 200, statut: "ok", derniereMaj: "Il y a 1 jour", prix: "450€/m³", fournisseur: "Simonin" },
  { id: 8, entrepot: "Entrepôt Sud", nom: "Tuiles", quantite: 1250, unite: "unités", min: 500, max: 2000, statut: "ok", derniereMaj: "Il y a 2 jours", prix: "1.2€/unité", fournisseur: "Terreal" },
  { id: 9, entrepot: "Entrepôt Sud", nom: "Isolation", quantite: 85, unite: "rouleaux", min: 30, max: 120, statut: "ok", derniereMaj: "Hier", prix: "35€/rouleau", fournisseur: "Isover" },
  { id: 10, entrepot: "Entrepôt Sud", nom: "Plâtre", quantite: 12, unite: "sacs", min: 20, max: 80, statut: "faible", derniereMaj: "Aujourd'hui", prix: "8€/sac", fournisseur: "Placoplatre" },
  { id: 11, entrepot: "Entrepôt Sud", nom: "Électricité", quantite: 2.8, unite: "km", min: 1, max: 5, statut: "ok", derniereMaj: "Il y a 3 jours", prix: "25€/m", fournisseur: "Nexans" },
  { id: 12, entrepot: "Entrepôt Sud", nom: "Sanitaires", quantite: 45, unite: "unités", min: 10, max: 100, statut: "ok", derniereMaj: "Hier", prix: "150€/unité", fournisseur: "Grohe" },
  
  // Entrepôt Ouest
  { id: 13, entrepot: "Entrepôt Ouest", nom: "Fenêtres", quantite: 28, unite: "unités", min: 10, max: 50, statut: "ok", derniereMaj: "Il y a 1 jour", prix: "280€/unité", fournisseur: "Velux" },
  { id: 14, entrepot: "Entrepôt Ouest", nom: "Portes", quantite: 15, unite: "unités", min: 5, max: 30, statut: "ok", derniereMaj: "Il y a 2 jours", prix: "220€/unité", fournisseur: "Lapeyre" },
  { id: 15, entrepot: "Entrepôt Ouest", nom: "Parquet", quantite: 245, unite: "m²", min: 100, max: 400, statut: "ok", derniereMaj: "Hier", prix: "45€/m²", fournisseur: "Quick-Step" },
  { id: 16, entrepot: "Entrepôt Ouest", nom: "Robinetterie", quantite: 85, unite: "unités", min: 20, max: 150, statut: "ok", derniereMaj: "Il y a 1 jour", prix: "75€/unité", fournisseur: "Hansgrohe" },
  { id: 17, entrepot: "Entrepôt Ouest", nom: "Chauffage", quantite: 12, unite: "unités", min: 5, max: 25, statut: "ok", derniereMaj: "Il y a 4 jours", prix: "1500€/unité", fournisseur: "Viessmann" },
  
  // Autres articles
  { id: 18, entrepot: "Entrepôt Nord", nom: "Sable", quantite: 25, unite: "tonnes", min: 30, max: 100, statut: "faible", derniereMaj: "Aujourd'hui", prix: "35€/tonne", fournisseur: "Granulats" },
  { id: 19, entrepot: "Entrepôt Sud", nom: "Gravier", quantite: 45, unite: "tonnes", min: 20, max: 80, statut: "ok", derniereMaj: "Hier", prix: "42€/tonne", fournisseur: "Granulats" },
  { id: 20, entrepot: "Entrepôt Ouest", nom: "Étanchéité", quantite: 8, unite: "rouleaux", min: 15, max: 40, statut: "critique", derniereMaj: "Aujourd'hui", prix: "125€/rouleau", fournisseur: "Soprema" }
];

export default function StockPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [entrepotFilter, setEntrepotFilter] = useState("tous");
  const [statutFilter, setStatutFilter] = useState("tous");
  const [sortBy, setSortBy] = useState("nom");
  const [sortOrder, setSortOrder] = useState("asc");
  const [viewMode, setViewMode] = useState("table"); // "table" ou "cards"

  // Filtrage et tri du stock
  const filteredAndSortedStock = useMemo(() => {
    let filtered = allStock.filter(item => {
      const matchesSearch = item.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.entrepot.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.fournisseur.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesEntrepot = entrepotFilter === "tous" || item.entrepot === entrepotFilter;
      const matchesStatut = statutFilter === "tous" || item.statut === statutFilter;
      
      return matchesSearch && matchesEntrepot && matchesStatut;
    });

    // Tri
    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch(sortBy) {
        case "nom":
          aValue = a.nom.toLowerCase();
          bValue = b.nom.toLowerCase();
          break;
        case "quantite":
          aValue = a.quantite;
          bValue = b.quantite;
          break;
        case "statut":
          const statutOrder = { "critique": 0, "faible": 1, "ok": 2 };
          aValue = statutOrder[a.statut] || 3;
          bValue = statutOrder[b.statut] || 3;
          break;
        case "prix":
          aValue = parseFloat(a.prix.replace(/[€/\w]/g, ''));
          bValue = parseFloat(b.prix.replace(/[€/\w]/g, ''));
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
  }, [searchTerm, entrepotFilter, statutFilter, sortBy, sortOrder]);

  const clearFilters = () => {
    setSearchTerm("");
    setEntrepotFilter("tous");
    setStatutFilter("tous");
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

  const getStockProgress = (quantite, min, max) => {
    return Math.max(0, Math.min(100, ((quantite - min) / (max - min)) * 100));
  };

  const entrepots = [...new Set(allStock.map(item => item.entrepot))];
  const alertesCount = allStock.filter(item => item.statut !== "ok").length;

  return (
    <Container maxWidth="xl" sx={{ py: 4, pt: 12 }}>
      {/* Header */}
      <Box mb={4}>
        <Typography variant="h4" fontWeight={700} color="primary" gutterBottom>
          Gestion Complète du Stock
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Vue d'ensemble de tous les stocks de vos entrepôts
        </Typography>
      </Box>

      {/* Statistiques rapides */}
            <Grid container spacing={3} mb={4}>
        <Grid item xs={12} sm={6} md={4}>
          <Card elevation={2}>
            <CardContent>
              <Typography variant="h4" fontWeight={800} color="primary">{allStock.length}</Typography>
              <Typography variant="body2" color="text.secondary">Articles Total</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card elevation={2}>
            <CardContent>
              <Typography variant="h4" fontWeight={800} color="warning.main">{alertesCount}</Typography>
              <Typography variant="body2" color="text.secondary">Alertes Stock</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card elevation={2}>
            <CardContent>
              <Typography variant="h4" fontWeight={800} color="success.main">{entrepots.length}</Typography>
              <Typography variant="body2" color="text.secondary">Entrepôts</Typography>
            </CardContent>
          </Card>
        </Grid>
        </Grid>

      {/* Barre de recherche et filtres */}
      <Card elevation={1} sx={{ mb: 4 }}>
        <CardContent>
          <Grid container spacing={3} alignItems="center">
            {/* Recherche */}
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                placeholder="Rechercher un article, entrepôt ou fournisseur..."
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

            {/* Filtre par entrepôt */}
            <Grid item xs={12} md={2}>
              <FormControl fullWidth>
                <InputLabel>Entrepôt</InputLabel>
                <Select
                  value={entrepotFilter}
                  label="Entrepôt"
                  onChange={(e) => setEntrepotFilter(e.target.value)}
                  sx={{ borderRadius: 3 }}
                >
                  <MenuItem value="tous">Tous</MenuItem>
                  {entrepots.map(entrepot => (
                    <MenuItem key={entrepot} value={entrepot}>{entrepot}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Filtre par statut */}
            <Grid item xs={12} md={2}>
              <FormControl fullWidth>
                <InputLabel>Statut</InputLabel>
                <Select
                  value={statutFilter}
                  label="Statut"
                  onChange={(e) => setStatutFilter(e.target.value)}
                  sx={{ borderRadius: 3 }}
                >
                  <MenuItem value="tous">Tous</MenuItem>
                  <MenuItem value="ok">Stock OK</MenuItem>
                  <MenuItem value="faible">Stock Faible</MenuItem>
                  <MenuItem value="critique">Stock Critique</MenuItem>
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
                  <MenuItem value="quantite">Quantité</MenuItem>
                  <MenuItem value="statut">Statut</MenuItem>
                  <MenuItem value="prix">Prix</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Mode d'affichage */}
            <Grid item xs={12} md={1}>
              <ButtonGroup fullWidth variant="outlined">
                <Button
                  onClick={() => setViewMode("table")}
                  variant={viewMode === "table" ? "contained" : "outlined"}
                  sx={{ borderRadius: "12px 0 0 12px", minWidth: "45px" }}
                >
                  <ViewList />
                </Button>
                <Button
                  onClick={() => setViewMode("cards")}
                  variant={viewMode === "cards" ? "contained" : "outlined"}
                  sx={{ borderRadius: "0 12px 12px 0", minWidth: "45px" }}
                >
                  <ViewModule />
                </Button>
              </ButtonGroup>
            </Grid>

            {/* Effacer */}
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
              <strong>{filteredAndSortedStock.length}</strong> article(s) trouvé(s)
              {searchTerm && (
                <> pour <strong>"{searchTerm}"</strong></>
              )}
              {entrepotFilter !== "tous" && (
                <> • Entrepôt: <strong>{entrepotFilter}</strong></>
              )}
              {statutFilter !== "tous" && (
                <> • Statut: <strong>{statutFilter}</strong></>
              )}
            </Typography>
          </Box>
        </CardContent>
      </Card>

      {/* Affichage des résultats */}
      {viewMode === "table" ? (
        /* Vue Tableau */
        <Card elevation={2}>
          <CardContent>
            <TableContainer component={Paper} elevation={0}>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: "rgba(50, 61, 130, 0.05)" }}>
                    <TableCell><strong>Article</strong></TableCell>
                    <TableCell><strong>Entrepôt</strong></TableCell>
                    <TableCell align="center"><strong>Quantité</strong></TableCell>
                    <TableCell align="center"><strong>Statut</strong></TableCell>
                    <TableCell align="center"><strong>Prix</strong></TableCell>
                    <TableCell><strong>Fournisseur</strong></TableCell>
                    <TableCell align="center"><strong>MAJ</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredAndSortedStock.map((item) => (
                    <TableRow key={item.id} sx={{ "&:hover": { backgroundColor: "rgba(0,0,0,0.02)" } }}>
                      <TableCell>
                        <Box>
                          <Typography variant="body2" fontWeight={600}>
                            {item.nom}
                          </Typography>
                          <LinearProgress
                            variant="determinate"
                            value={getStockProgress(item.quantite, item.min, item.max)}
                            color={getStatutColor(item.statut)}
                            sx={{ height: 4, borderRadius: 2, mt: 1 }}
                          />
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" color="text.secondary">
                          {item.entrepot}
                        </Typography>
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
                        <Typography variant="body2" fontWeight={600} color="primary">
                          {item.prix}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" color="text.secondary">
                          {item.fournisseur}
                        </Typography>
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
      ) : (
        /* Vue Cartes */
        <Grid container spacing={3}>
          {filteredAndSortedStock.map((item) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
              <Card 
                elevation={2}
                sx={{ 
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: 4
                  }
                }}
              >
                <CardContent>
                  <Box display="flex" justifyContent="space-between" alignItems="start" mb={2}>
                    <Typography variant="h6" fontWeight={700} color="primary">
                      {item.nom}
                    </Typography>
                    <Chip
                      label={item.statut}
                      color={getStatutColor(item.statut)}
                      size="small"
                      sx={{ fontWeight: 600 }}
                    />
                  </Box>

                  <Typography variant="body2" color="text.secondary" mb={1}>
                    <strong>Entrepôt:</strong> {item.entrepot}
                  </Typography>

                  <Box mb={2}>
                    <Box display="flex" justifyContent="space-between" mb={1}>
                      <Typography variant="body2" fontWeight={600}>
                        Stock: {item.quantite} {item.unite}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Min: {item.min} / Max: {item.max}
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={getStockProgress(item.quantite, item.min, item.max)}
                      color={getStatutColor(item.statut)}
                      sx={{ height: 6, borderRadius: 3 }}
                    />
                  </Box>

                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                    <Typography variant="body2" fontWeight={600} color="primary">
                      {item.prix}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {item.derniereMaj}
                    </Typography>
                  </Box>

                  <Typography variant="caption" color="text.secondary">
                    Fournisseur: {item.fournisseur}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {filteredAndSortedStock.length === 0 && (
        <Card elevation={1}>
          <CardContent sx={{ textAlign: "center", py: 6 }}>
            <Search sx={{ fontSize: 48, color: "text.disabled", mb: 2 }} />
            <Typography variant="h6" color="text.secondary" mb={1}>
              Aucun article trouvé
            </Typography>
            <Typography variant="body2" color="text.disabled" mb={3}>
              Essayez de modifier vos critères de recherche
            </Typography>
            <Button variant="outlined" onClick={clearFilters}>
              Effacer les filtres
            </Button>
          </CardContent>
        </Card>
      )}
    </Container>
  );
} 