/**
 * Entity icon mappings for Data Tree and File Tree.
 *
 * Use these to resolve the correct icon for an entity type.
 * Import the icon component from `dbui/components/icons/{value}`.
 *
 * Example:
 *   import { dataEntityIcons } from "dbui/components/icons/entity-icons"
 *   import * as Icons from "dbui/components/icons"
 *   const Icon = Icons[dataEntityIcons.table] // → Table component
 */

// ─── Data Tree entity types (Unity Catalog namespace objects) ───

export const dataEntityIcons = {
  /** Unity Catalog container */
  catalog: "Catalog",
  /** Personal default catalog */
  catalogUserHome: "CatalogUserHome",
  /** Workspace default catalog */
  catalogHome: "CatalogHome",
  /** Shared catalog (Delta Sharing) */
  catalogShared: "CatalogShared",
  /** System/legacy catalog (hive_metastore) */
  catalogGear: "CatalogGear",

  /** Schema (database) within a catalog */
  schema: "Database",

  /** Standard table */
  table: "Table",
  /** View (virtual table, SQL query) */
  view: "TableView",
  /** Materialized view (precomputed, auto-refreshed) */
  materializedView: "TableLightning",
  /** Streaming table (real-time, Lakeflow) */
  streamingTable: "TableStream",
  /** Sync table (materialized, auto-refreshed) */
  syncTable: "TableLightning",
  /** Feature table (Feature Store, ML features) */
  featureTable: "TableModel",
  /** Metric view (AI/BI KPI, measure, aggregation) */
  metricView: "TableMeasure",
  /** Online table (serving, low-latency) */
  onlineTable: "TableGlobe",

  /** ML model (model registry) */
  model: "Models",
  /** Volume (managed storage) */
  volume: "FolderCloud",
  /** Volume folder (cloud storage subdirectory) */
  volumeFolder: "FolderCloud",
  /** UDF / SQL function */
  function: "Function",
  /** Connection (external data source) */
  connection: "ArrowsConnect",
} as const

// ─── File Tree entity types (Workspace objects) ───

export const fileEntityIcons = {
  /** Standard folder */
  folder: "Folder",
  /** Open folder (expanded state) */
  folderOpen: "FolderOpen",
  /** Git-linked folder (repo) */
  gitFolder: "FolderBranch",
  /** Pipeline folder (DLT) */
  pipelineFolder: "FolderSolidPipeline",
  /** Asset bundle folder (DAB) */
  bundleFolder: "FolderCube",
  /** Volume folder */
  volumeFolder: "FolderCloud",

  /** Notebook (cell-based document) */
  notebook: "Notebook",
  /** SQL query file */
  query: "Query",
  /** Generic file */
  file: "File",
  /** Dashboard (AI/BI report) */
  dashboard: "Dashboard",
  /** ML model file */
  modelFile: "FileModel",
  /** Bundle file */
  bundle: "Briefcase",
} as const

// ─── Column data type icons ───

export const columnTypeIcons = {
  /** Integer, bigint, smallint */
  integer: "Numbers",
  /** Decimal, double, float */
  decimal: "Decimal",
  /** Float (same as decimal visually) */
  float: "Float",
  /** String, varchar, text */
  string: "Letters",
  /** Boolean */
  boolean: "Binary",
  /** Date, timestamp */
  timestamp: "CalendarClock",
  /** ID, primary key, foreign key */
  id: "Hash",
  /** Mixed alphanumeric */
  alphanumeric: "LettersNumbers",
} as const
