import {
  buildPublishingPackage,
  formatPublishingPackage,
  validatePublishingPackage,
} from "../lib/growth/publishing-package";

const validation = validatePublishingPackage();
const pkg = buildPublishingPackage();

console.log(formatPublishingPackage(pkg));

if (!validation.valid) {
  process.exitCode = 1;
}
