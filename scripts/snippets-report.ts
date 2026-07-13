import {
  buildSnippetOptimizationReport,
  formatSnippetOptimizationReport,
} from "@/lib/growth/snippet-optimization";

const report = buildSnippetOptimizationReport();

console.log(formatSnippetOptimizationReport(report));
