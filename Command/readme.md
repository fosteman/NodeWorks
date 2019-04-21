Command pattern
A command is an object that encapsulates all needed information for operation upon the target to be performed in future. Thus instead of a method or function invoked, an object representing a command is. 

Organization of this pattern is divided on 3 elements:
Command: an object encapsulating all methods and algorithms
Client: Creates a Command and provides it to Invoker
Invoker: Executes command on the target

A command can be:
Atomic
Scheduled, Canceled, Undone
Serialized for network transmissions and RPC
Transformations on commands can be performed: removal of specific instructions, joining, splitting, or applying Operation Transformation (OT) (used in real-time collaborative editors)

Fully fledged command pattern is somewhat inefficient - ton of code to invoke a method (statusUpdateSerivce). If a schedule, async support is needed, use tast pattern. However, undo, transformations, conflict resolutions etc. are strong side of Command pattern.

