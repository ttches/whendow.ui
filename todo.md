set availability anonymous should
username -> req check username on meetingId ->
if exists, passcode enter
else create

if you think it's an improvement over the current code, submit could be added as a createmeeting step, and a useeffect could submit when the step is submit

mobile scroll to bottom of screen when input is focussed

android/windows fonts not working

- orange dots for 100% availability 1+ person
- max height 1/3 if only one person in meeting
- don't swap months switching between set / view
- if next month fits all availability, show it

MVP features
- owner picks winning date(s) from the heatmap
- lock meeting on finalize (use existing Meeting.Locked field), no more availability edits while locked
- owner can unlock a finalized meeting to reopen it
- tap a date in view mode to see who's available that day - FloatingFooter-style panel, not a modal, so tapping between dates stays fast on mobile
- locked/finalized view: replace the calendar with a clean summary screen showing the winning date(s) front and center (no heatmap, no tap-to-inspect in this state)

Post-MVP follow-ups
- replace the owner sentinel-date trick (AvailabilityService.OwnerIdentificationDate) with a real OwnerPasscode column on Meeting, set + cookie the owner at creation, and drop the sentinel-date filtering in GetAvailabilityByMeetingId
