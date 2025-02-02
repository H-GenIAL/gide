import { z } from "zod";

export const othersFormSchema = z.object({
  // DUREE
  adresse: z.string().optional(),
  date_sign: z.string().optional(),
  pinel: z.string().optional(),
  date_prise_effet: z.string().optional(),
  duree_bail: z.string().optional(),
  terme_contrat_bail: z.string().optional(),
  periode_ferme: z.string().optional(),
  pro_fac_sortie: z.string().optional(),
  preavis_min: z.string().optional(),
  clause_spe_duree_bail_renouv: z.string().optional(),
  // LOYER
  mode_calc_fixe: z.string().optional(),
  mode_calc_paliers: z.string().optional(),
  mode_calc_recette: z.string().optional(),
  loyer_annuel_init: z.string().optional(),
  loyer_annuel_cours: z.string().optional(),
  paiement_trim_av: z.string().optional(),
  tva: z.string().optional(),
  clause_index: z.string().optional(),
  date_index: z.string().optional(),
  period_index: z.string().optional(),
  indice_insee: z.string().optional(),
  premiere_index: z.string().optional(),
  index_suivantes: z.string().optional(),
  indice_comparaison: z.string().optional(),
  indice_base_fixe: z.string().optional(),
  index_hausse_uniqmt: z.string().optional(),
  plafond_plancher: z.string().optional(),
  risque_distorsion: z.string().optional(),
  divisibilite_clause_index: z.string().optional(),
  augment_comp_dern_loyer: z.string().optional(),
  clause_loyer_bail_renouv: z.string().optional(),
  // MESURES D'ACCOMPAGNEMENT
  franchise_reduct_loyer: z.string().optional(),
  side_letter_tva: z.string().optional(),
  autres_mesures_accomp: z.string().optional(),
  // GARANTIES
  depot_garantie: z.string().optional(),
  autres_garanties: z.string().optional(),
  garantie_possess_b: z.string().optional(),
  garantie_cautio_soli: z.string().optional(),
  garantie_autonome: z.string().optional(),
  garantie_autre: z.string().optional(),
  garant_societe: z.string().optional(),
  garant_banque: z.string().optional(),
  montant: z.string().optional(),
  expiration: z.string().optional(),
  transfer_nb: z.string().optional(),
  // HONORAIRES, IMPOTS, TAXES ET ASSURANCE DU BAILLEUR
  ppb_impots: z.string().optional(),
  ppb_taxe_fonc: z.string().optional(),
  ppb_teom: z.string().optional(),
  ppb_loc_comm: z.string().optional(),
  ppp_impots: z.string().optional(),
  ppp_taxe_fonc: z.string().optional(),
  ppp_teom: z.string().optional(),
  ppp_loc_comm: z.string().optional(),
  pp_impots: z.string().optional(),
  pp_taxe_fonc: z.string().optional(),
  pp_teom: z.string().optional(),
  pp_loc_comm: z.string().optional(),
  pcb_impots: z.string().optional(),
  pcb_taxe_fonc: z.string().optional(),
  pcb_teom: z.string().optional(),
  pcb_loc_comm: z.string().optional(),
  pcp_impots: z.string().optional(),
  pcp_taxe_fonc: z.string().optional(),
  pcp_teom: z.string().optional(),
  pcp_loc_comm: z.string().optional(),
  pc_impots: z.string().optional(),
  pc_taxe_fonc: z.string().optional(),
  pc_teom: z.string().optional(),
  pc_loc_comm: z.string().optional(),
  hb_gest_tech: z.string().optional(),
  hb_gest_loc: z.string().optional(),
  hb_gest_loyers: z.string().optional(),
  hb_gest_synd: z.string().optional(),
  hp_gest_tech: z.string().optional(),
  hp_gest_loc: z.string().optional(),
  hp_gest_loyers: z.string().optional(),
  hp_gest_synd: z.string().optional(),
  hnp_gest_tech: z.string().optional(),
  hnp_gest_loc: z.string().optional(),
  hnp_gest_loyers: z.string().optional(),
  hnp_gest_synd: z.string().optional(),
  assu_b_b: z.string().optional(),
  assu_b_p: z.string().optional(),
  assu_b_np: z.string().optional(),
  fonds_marktg: z.string().optional(),
  // TRAVAUX - REPARATIONS - REMPLACEMENTS
  pp_b_rep: z.string().optional(),
  pp_b_confo: z.string().optional(),
  pp_b_vetus: z.string().optional(),
  pp_b_equip: z.string().optional(),
  pp_p_rep: z.string().optional(),
  pp_p_confo: z.string().optional(),
  pp_p_vetus: z.string().optional(),
  pp_p_equip: z.string().optional(),
  pp_np_rep: z.string().optional(),
  pp_np_confo: z.string().optional(),
  pp_np_vetus: z.string().optional(),
  pp_np_equip: z.string().optional(),
  pc_b_rep: z.string().optional(),
  pc_b_confo: z.string().optional(),
  pc_b_vetus: z.string().optional(),
  pc_b_equip: z.string().optional(),
  pc_p_rep: z.string().optional(),
  pc_p_confo: z.string().optional(),
  pc_p_vetus: z.string().optional(),
  pc_p_equip: z.string().optional(),
  pc_np_rep: z.string().optional(),
  pc_np_confo: z.string().optional(),
  pc_np_vetus: z.string().optional(),
  pc_np_equip: z.string().optional(),
  // DESTRUCTION
  derog_1722: z.string().optional(),
  facu_modif: z.string().optional(),
  facu_trav: z.string().optional(),
  facu_p_trav: z.string().optional(),
  facu_p_plaques: z.string().optional(),
  // RESTITUTION DES LOCAUX LOUES
  etat_neuf: z.string().optional(),
  etat_parfait: z.string().optional(),
  etat_bon: z.string().optional(),
  etat_usage: z.string().optional(),
  clause_accession: z.string().optional(),
  facu_b_remise_etat: z.string().optional(),
  indemn_immo: z.string().optional(),
  edl_entree_dataroom: z.string().optional(),
  // SOUS-LOCATION / LOCATION-GERANCE / DOMICILIATION / CESSION
  facu_sousloc: z.string().optional(),
  facu_loca_gerance: z.string().optional(),
  facu_domic: z.string().optional(),
  facu_cess_droit_bail: z.string().optional(),
  facu_cess_fonds_com: z.string().optional(),
  locaux_indiv: z.string().optional(),
  garanties_cession: z.string().optional(),
  gar_cess_enti_prem: z.string().optional(),
  gar_cess_enti_successifs: z.string().optional(),
  gar_cess_dur_stip_3y: z.string().optional(),
  gar_cess_cessionnaire: z.string().optional(),
  // DROIT DE PREEMPTION / DROIT DE PREFERENCE
  droit_pref_b_app: z.string().optional(),
  droit_pref_b_loc_loues: z.string().optional(),
  droit_pref_b_immeuble: z.string().optional(),
  droit_pref_p_fonds_com: z.string().optional(),
  annex_dta: z.string().optional(),
  annex_er: z.string().optional(),
  annex_dpe: z.string().optional(),
  annex_envir: z.string().optional(),
  decret_terti_applicable: z.string().optional(),
  icpe: z.string().optional(),
  // STIPULATIONS INTUITU PERSONAE / RENONCIATIONS
  stipu_intuitu_personae: z.string().optional(),
  renonc_imprev: z.string().optional(),
  // RELATIONS AVEC LE PRENEUR
  relations_impayes: z.string().optional(),
  relations_ech_signif: z.string().optional(),
  relations_precontentieux: z.string().optional(),
  // COMMENTAIRES
  commentaires: z.string().optional(),
  // DOCUMENTS REVUS
  index_audites: z.string().optional(),
});
