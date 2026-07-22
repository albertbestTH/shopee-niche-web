# Category Mapping

The mapping is explicit in `src/data/category-map.json`. An unmapped category remains `null` and is never forced into an unrelated site category.

| Workbook category | Records | Current site category | Status | Notes | Required future action |
| --- | ---: | --- | --- | --- | --- |
| ทีวีและเครื่องใช้ไฟฟ้า | 8 | None | UNMAPPED | The current MVP has no TV/electrical category. | Approve a future category before route generation. |
| ไอทีและอุปกรณ์ | 5 | `it` | MAPPED | Explicit match to the existing IT and gadgets page. | Review naming consistency before publishing keyword pages. |
| บ้านและครัว | 12 | None | UNMAPPED | The current MVP has no home/kitchen category. | Approve a future category before route generation. |
| มอเตอร์ไซค์และยานยนต์ | 3 | `motorcycle` | MAPPED | Explicit match to the existing motorcycle page. | Confirm whether automotive scope belongs on the same page later. |
| แฟชั่นและกระเป๋า | 1 | None | UNMAPPED | The current MVP has no fashion category. | Approve a future category before route generation. |
| อื่น ๆ | 1 | None | REVIEW REQUIRED | Generic source category cannot be routed safely. | Reclassify or explicitly approve a destination before use. |

## Summary

- Workbook categories: 6
- Mapped categories: 2 (`ไอทีและอุปกรณ์`, `มอเตอร์ไซค์และยานยนต์`)
- Unmapped categories: 3 (`ทีวีและเครื่องใช้ไฟฟ้า`, `บ้านและครัว`, `แฟชั่นและกระเป๋า`)
- Review required: 1 (`อื่น ๆ`)
- Mapped keyword records: 8
- Unmapped/review-required keyword records: 22

No new category route was created in Phase 2.
